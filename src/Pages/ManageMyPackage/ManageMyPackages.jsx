import React from 'react'

function ManageMyPackages() {

    

  
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">My Added Packages</h2>

            {myPackages.length === 0 ? (
                <p className="text-center text-gray-500">You haven’t added any packages yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2 text-left">Package Name</th>
                                <th className="border px-4 py-2 text-left">Destination</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {myPackages.map((pkg) => (
                                <tr key={pkg._id}>
                                    <td className="border px-4 py-2">{pkg.tourName}</td>
                                    <td className="border px-4 py-2">{pkg.destination || "N/A"}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleUpdate(pkg._id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pkg._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    
        )
  
}

export default ManageMyPackages
