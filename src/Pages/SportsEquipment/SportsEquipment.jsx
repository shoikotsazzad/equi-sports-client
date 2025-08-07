import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Card from '../../Components/Card/Card';

const SportsEquipment = () => {


    const loadedEquipments = useLoaderData();
    const [equipments, setEquipments] = useState(loadedEquipments);

    return (
        <div className='md:m-20'>
            <h1 className='text-6xl text-purple-500 text-center md:mb-16'>Sports Equipments: {equipments.length} </h1>
            
            <div className='grid md: md:grid-cols-2 md:gap-16'>
            {
                equipments.map(equipment => <Card 
                    key={equipment._id}
                    equipment={equipment}
                    equipments={equipments}
                    setEquipments={setEquipments}
                    ></Card>)
            }
            </div>
            
        </div>
    );
};

export default SportsEquipment;