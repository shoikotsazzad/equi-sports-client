import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Card = ({ equipment, equipments, setEquipments }) => {

    const {
        _id,
        item,
        category,
        description,
        price,
        rating,
        stock,
        photo
    } = equipment;


    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // If the user confirms the deletion
                console.log("delete confirmed");
                fetch(`http://localhost:4000/sports/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if(data.deletedCount > 0){
                            Swal.fire({
                                        title: "Deleted!",
                                        text: "Your Product has been deleted.",
                                        icon: "success"
                                    });
                                    const remaining = equipments.filter(equipment => equipment._id !== _id);
                                    setEquipments(remaining);
                        }
                    })
            }
        });

    }


    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure className="w-48 h-48">
                <img className="object-cover w-full h-full" src={photo} alt="equipment" />
            </figure>


            <div className="flex justify-between w-full md:p-4">
                {/* Left Content */}
                <div>
                    <h2 className="card-title">Name: {item}</h2>
                    <p>{category}</p>
                    <p>{description}</p>
                    <p>{price}</p>
                    <p>{rating}</p>
                    <p>{stock}</p>
                </div>

                {/* Vertical Buttons aligned right */}
                <div className="card-actions ml-auto">
                    <div className="flex flex-col  md:space-y-4">
                        <button className="btn btn-active">View</button>
                        <Link to={`/updatesportsequipment/${_id}`}>
                        <button className="btn btn-active">Update</button>
                        </Link>
                        <button
                            onClick={() => handleDelete(_id)}
                            className="btn btn-active bg-orange-400">X</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Card;