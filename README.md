# Lapidum Web App

Aplicação básica para testar se a LAPIDUM poderá ter seu sistema em Web.

## Instalação

Backend:

```bash
cd backend
pip install Flask Flask-SQLAlchemy Flask-Migrate Flask-CORS
export FLASK_APP=server.py
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
flask run


Frontend: Buscar tutorial de instalação de React (é um pouco mais complicado)

```bash
cd frontend
npx create-react-app .
npm start
