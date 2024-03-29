import { useState, useEffect } from 'react'

const TableClients = () => {
    const [clients, setClients] = useState([])

    const getClients = async () => {
        try {
            const response = await fetch('http://localhost:4000/client', {
                method: 'GET',
                headers: {
                    authorization: localStorage.getItem('token')
                }
            });
            const clients = await response.json()
            setClients(clients);

        } catch (error) {
            console.log("error", error)
        }
    }

    const deleteClient = async (id) => {
        await fetch(`http://localhost:4000/client/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('token')
            }
        });

        getClients()
    };

    useEffect(() => {
        getClients()
    }, [])

    return (
        <>
            {clients.length > 0 ? (
                <div className="table-responsive mt-4">
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Dirección</th>
                                <th>Celular</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client, i) => (
                                <tr key={i}>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.address}</td>
                                    <td>{client.phone}</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary" 
                                            onClick={() => deleteClient(client.id)}
                                          >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h3 className="text-center mt-4">No hay Clientes</h3>
            )}
        </>
    )
}

export default TableClients
