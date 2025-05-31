from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

GRADE_POINTS = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "F": 0,
    "AB": 0,
    "I": 0,
}

@app.route('/calculate_gpa', methods=['POST'])
def calculate_gpa():
    data = request.get_json()

    # Input validation
    if not data or 'subjects' not in data:
        return jsonify({'error': 'Missing subject data'}), 400

    subjects = data['subjects']

    total_credits = 0.0
    total_weighted_points = 0.0

    for subject in subjects:
        try:
            credits = float(subject.get('credits', 0))  
            grade = subject.get('grade', '').strip().upper()

            if grade not in GRADE_POINTS:
                return jsonify({'error': f'Invalid grade: {grade}'}), 400

            grade_point = GRADE_POINTS[grade]
            total_credits += credits
            total_weighted_points += credits * grade_point
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid input data format'}), 400

    if total_credits == 0:
        return jsonify({'error': 'Total credits cannot be zero'}), 400

    sgpa = total_weighted_points / total_credits
    return jsonify({'sgpa': round(sgpa, 2)}), 200

if __name__ == '__main__':
    app.run(debug=True)
