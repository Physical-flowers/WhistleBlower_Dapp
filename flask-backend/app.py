from flask import Flask, request, jsonify, render_template
from flask_mail import Mail, Message
from flask_cors import CORS
from dotenv import load_dotenv
import os

# 加載環境變數
load_dotenv()

app = Flask(__name__)
CORS(app)

# 設定郵件伺服器配置
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS').lower() in ['true', '1', 't']
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

mail = Mail(app)

@app.route('/send-mail', methods=['POST'])
def send_mail():
    data = request.get_json()
    required_fields = ['email', 'url', 'decryption_key', 'ipfs_cid', 'wallet_address'] # 部分資料是預先使用測試，之後會改掉
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return jsonify({'error': 'Invalid input', 'missing_fields': missing_fields}), 400
    
    recipient_email = data['email']
    url = data['url']
    decryption_key = data['decryption_key'] # 預留，之後會改掉
    ipfs_cid = data['ipfs_cid'] # 預留，之後會改掉
    wallet_address = data['wallet_address']
    description = data.get('description', 'Please click the link below to proceed.')
    deposit_amount = data.get('deposit_amount', 'some amount')  # 假設抵押金額作為一個可選字段
    
    # 渲染 HTML 模板
    html_content = render_template('email_template.html', url=url, deposit_amount=deposit_amount, description=description, wallet_address=wallet_address)
    
    msg = Message('Important Notification and Link from WhistleBlower Dapp', sender=f'WhistleBlower Dapp <{app.config["MAIL_USERNAME"]}>', recipients=[recipient_email])
    msg.html = html_content  # 使用 HTML 內容
    
    try:
        mail.send(msg)
        print("Mail sent successfully")
        return jsonify({'message': 'Mail sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)
