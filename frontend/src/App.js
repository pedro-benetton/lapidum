import React, { useState, useEffect } from 'react';

function App() {

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };
  
  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    border: '1px solid #dddddd',
    textAlign: 'left',
  };
  
  const tdStyle = {
    padding: '8px',
    border: '1px solid #dddddd',
    textAlign: 'left',
  };

  const [formData, setFormData] = useState({
    id: '',
    codigo_interno: '',
    codigo_local: '',
    codigo_atacado: '',
    codigo_do_preco: '',
    grupo: ''
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:5000/registra_produto';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setFormData({
          id: '',
          codigo_interno: '',
          codigo_local: '',
          codigo_atacado: '',
          codigo_do_preco: '',
          grupo: ''
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePrintProducts = () => {
    const apiUrl_2 = 'http://localhost:5000/mostra_produtos';

    fetch(apiUrl_2)
      .then(response => response.json())
      .then(data => {
        console.log('Products:', data.products);
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    handlePrintProducts();
  }, []);

  return (
    <div className="App">
      <h1>Registro de Produtos da LAPIDUM</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" name="id" value={formData.id} onChange={handleChange} />
        </label>
        <br />
        <label>
          Código Interno:
          <input type="text" name="codigo_interno" value={formData.codigo_interno} onChange={handleChange} />
        </label>
        <br />
        <label>
          Código Local:
          <input type="text" name="codigo_local" value={formData.codigo_local} onChange={handleChange} />
        </label>
        <br />
        <label>
          Código Atacado:
          <input type="text" name="codigo_atacado" value={formData.codigo_atacado} onChange={handleChange} />
        </label>
        <br />
        <label>
          Código do Preço:
          <input type="text" name="codigo_do_preco" value={formData.codigo_do_preco} onChange={handleChange} />
        </label>
        <br />
        <label>
          Grupo:
          <input type="text" name="grupo" value={formData.grupo} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>

      <hr />

      <h2>Produtos Registrados</h2>
      <button onClick={handlePrintProducts}>Mostrar Produtos Registrados</button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Código Interno</th>
            <th style={thStyle}>Código Local</th>
            <th style={thStyle}>Código Atacado</th>
            <th style={thStyle}>Código do Preço</th>
            <th style={thStyle}>Grupo</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={tdStyle}>{product.id}</td>
              <td style={tdStyle}>{product.codigo_interno}</td>
              <td style={tdStyle}>{product.codigo_local}</td>
              <td style={tdStyle}>{product.codigo_atacado}</td>
              <td style={tdStyle}>{product.codigo_do_preco}</td>
              <td style={tdStyle}>{product.grupo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;