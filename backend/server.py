from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)
migrate = Migrate(app, db)

class Product(db.Model):
    id = db.Column(db.String, primary_key=True)
    codigo_interno = db.Column(db.String)
    codigo_local = db.Column(db.String)
    codigo_atacado = db.Column(db.String)
    codigo_do_preco = db.Column(db.String)
    grupo = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'codigo_interno': self.codigo_interno,
            'codigo_local': self.codigo_local,
            'codigo_atacado': self.codigo_atacado,
            'codigo_do_preco': self.codigo_do_preco,
            'grupo': self.grupo
        }

@app.route('/registra_produto', methods=['POST', 'GET'])
def registra_produto():
    try:
        data = request.get_json()
        new_product = Product(id = data['id'],
                            codigo_interno = data['codigo_interno'],
                            codigo_local = data['codigo_local'],
                            codigo_atacado = data['codigo_atacado'],
                            codigo_do_preco = data['codigo_do_preco'],
                            grupo = data['grupo'])
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Data received and saved successfully'})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'success': False, 'message': 'Error processing the data'})

@app.route('/mostra_produtos', methods=['GET'])
def print_products():
    try:
        products = Product.query.all()
        products_list = [product.to_dict() for product in products]

        return jsonify({'success': True, 'products': products_list})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'success': False, 'message': 'Error fetching products'})