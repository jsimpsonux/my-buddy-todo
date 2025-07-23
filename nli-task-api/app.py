from flask import Flask, request, jsonify
from flask_cors import CORS
from dateparser.search import search_dates
import re
import logging
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)


logging.basicConfig(level=logging.DEBUG, format='%(asctime)s [%(levelname)s] %(message)s')

def parse_task(text):
    logging.debug(f"Raw input text: {text}")


    normalized_text = re.sub(r'[.,]', ' ', text)
    normalized_text = ' '.join(normalized_text.split())
    logging.debug(f"Normalized text for parsing: {normalized_text}")


    found_dates = search_dates(
        normalized_text,
        settings={
            'PREFER_DATES_FROM': 'future',
            'RELATIVE_BASE': datetime.now(),
            'RETURN_AS_TIMEZONE_AWARE': False
        }
    )
    logging.debug(f"Found dates: {found_dates}")

    due_date = None
    cleaned = normalized_text

    if found_dates:

        date_phrase, date_obj = found_dates[-1]
        logging.debug(f"Selected date phrase: {date_phrase} -> {date_obj}")


        if date_obj < datetime.now():
            date_obj += timedelta(days=1)
            logging.debug("Date was in the past — shifted one day forward.")

        due_date = date_obj


        cleaned = normalized_text.replace(date_phrase, '').strip()
        cleaned = re.sub(r'\s{2,}', ' ', cleaned)

    logging.debug(f"Final cleaned task title: {cleaned}")
    logging.debug(f"Final due_date: {due_date.isoformat() if due_date else None}")

    return {
        "title": cleaned if cleaned else text,
        "due_date": due_date.isoformat() if due_date else None
    }

@app.route("/api/parse-task", methods=["POST", "OPTIONS"])
def parse():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight successful"}), 200

    data = request.get_json()
    logging.info(f"Received JSON payload: {data}")
    text = data.get("text", "")
    if not text:
        logging.warning("No 'text' field provided in request")
        return jsonify({"error": "Missing 'text' field"}), 400

    result = parse_task(text)
    logging.info(f"Response: {result}")
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)