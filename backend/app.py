from flask import Flask, request
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def handle_data_from_react():
    try:
        print("Received data from React")
        data = request.json.get('players', [])

        with open('scores.txt', 'w') as f:
            for entry in data.values():
                f.write(f'{entry["name"]} {entry["score"]}\n')
        return 'Data received and written to scores.txt successfully', 200

    except Exception as e:
        logging.error(f'Error handling data from React: {e}')
        return 'An error occurred while handling the data', 500


@app.route('/', methods=['GET'])
def send_data_to_react():
    print('Sending data to React')
    scores = {}
    for line in open('scores.txt'):
        name, score = line.split()
        scores[name] = score
    return scores, 200


if __name__ == '__main__':
    app.run(port=8080, debug=True)
