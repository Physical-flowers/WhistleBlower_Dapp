# Backend Server for Testing Frontend
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)  # 確保支持憑證

# 模擬的數據庫，用於存儲 token 和 email
database = {}

@app.route('/upload', methods=['POST'])
def upload():
    print(request.form)
    email = request.form.get('email')
    wallet_address = request.form.get('walletAddress')
    token = request.form.get('token')
    pdf_file = request.files.get('pdfFile')

    if not email or not wallet_address or not token or not pdf_file:
        return jsonify({'error': 'Missing required fields'}), 400

    # 將 PDF 文件存儲到模擬的數據庫中（這裡僅存儲其 base64 編碼）
    pdf_content = base64.b64encode(pdf_file.read()).decode('utf-8')

    # 存儲 token 和 email 的對應關係
    database[token] = {
        'email': email,
        'wallet_address': wallet_address,
        'pdf_content': pdf_content
    }

    return jsonify({'message': 'File uploaded and email sent successfully'})

@app.route('/verify', methods=['GET'])
def verify():
    token = request.args.get('token')

    if not token or token not in database:
        return jsonify({'error': 'Invalid token'}), 400

    email = database[token]['email']
    return jsonify({'email': email})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
