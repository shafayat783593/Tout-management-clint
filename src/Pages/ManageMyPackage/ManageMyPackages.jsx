import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import UseAuth from '../../Hooks/UseAuth'

function ManageMyPackages() {
const [Tasks, setTasks] = useState([])
const [Loading, setLoading] = useState(false)
const {user}= UseAuth()
const navigate =useNavigate()

    useEffect(() => {


        fetch(`http://localhost:3000/manageMyPackages/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [user?.email]);



  
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">My Added Packages</h2>

            {Tasks.length === 0 ? (
                <p className="text-center text-gray-500">You haven’t added any packages yet.</p>
            ) : (
                <div className="overflow-x-auto">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Job</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                              <tbody>

                                    {
                                        Tasks.map((task, index) =>  <tr  key={index}>
                                                <th>{index + 1}</th>
                                                <td>{task.tourName}</td>
                                                <td>Quality Control Specialist</td>
                                                <td >

                                                <Link to={`/updateMyPosted/`}>
                                                    
                                                    
                                                    <Link to={`/updateMyPosted/${task._id}`}
                                            
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                                                    >
                                                        Update
                                                    </Link>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(pkg._id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>


                                        )
                                    }
                              </tbody>
                            </table>
                        </div>
                </div>
            )}
        </div>
    
        )
  
}

export default ManageMyPackages
