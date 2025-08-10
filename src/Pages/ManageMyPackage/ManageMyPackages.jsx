import React, { useEffect, useState } from 'react'
import { data, Link, useLoaderData, useNavigate } from 'react-router'
import UseAuth from '../../Hooks/UseAuth'
import Loading from '../../components/Loading/Loading'
import axios from 'axios'
import Swal from 'sweetalert2'
import UseAxiosSecure from '../../Hooks/UseAxiosSecure'
import PageTitle from '../../Hooks/PageTitle'

function ManageMyPackages() {
    const [Tasks, setTasks] = useState([])
    const [loading, setloading] = useState(true)
    const { user } = UseAuth()
    const navigate = useNavigate()
    const axiosSecure = UseAxiosSecure()
    useEffect(() => {

        axiosSecure(`http://localhost:3000/manageMyPackages/${user.email}`).then(res => {

            setTasks(res?.data);
            setloading(false);

        }).catch((err) => {
            console.error(err);
            setloading(false);
        });


    }, [user?.email, axiosSecure]);




    const handelDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "This task will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/deleteMyPost/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        setTasks((prev) => prev.filter((task) => task._id !== id));
                        Swal.fire("Deleted!", "Task has been deleted.", "success");
                    }



                }).catch(error => {
                    console.error(error);

                    Swal.fire("Error", "Something went wrong.", "error");
                })


            }
        });


    }

    if (loading) {
        return <Loading />
    }





    return (
        <>
            <PageTitle title="ManageMy Packages" />

            <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Manage my Packages</h2>

                {Tasks.length === 0 ? (
                    <p className="text-center text-gray-500">
                        You haven’t added any packages yet.
                    </p>
                ) : (
                    <>
                        {/* Table for large screens */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Job</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Tasks.map((task, index) => (
                                        <tr key={task._id}>
                                            <th>{index + 1}</th>
                                            <td>{task.tourName}</td>
                                            <td>{task?.price} taka</td>
                                            <td>
                                                <Link
                                                    to={`/updateMyPosted/${task._id}`}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Update
                                                </Link>
                                                <button
                                                    onClick={() => handelDelete(task._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Card format for mobile */}
                        <div className="grid gap-4 md:hidden">
                            {Tasks.map((task, index) => (
                                <div
                                    key={task._id}
                                    className="border rounded-lg p-4 shadow-sm "
                                >
                                    <p className="text-sm text-gray-500">#{index + 1}</p>
                                    <h3 className="text-lg font-bold">{task.tourName}</h3>
                                    <td>{task?.price} taka</td>
                                    <div className="mt-3 flex gap-2">
                                        <Link
                                            to={`/updateMyPosted/${task._id}`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handelDelete(task._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>


    )

}

export default ManageMyPackages
