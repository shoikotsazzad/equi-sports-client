import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const Registration = () => {

    const { createUser } = useContext(AuthContext)

    const handleRegistration = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log('Registration form submitted', email, password);
        createUser(email, password)
            .then(result => {
                console.log(result.user)

                //update last login time
                const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                const loginInfo = {email, lastSignInTime};

                fetch(`http://localhost:4000/users`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginInfo)
                })
                .then(res => res.json())
                .then(data =>{
                    console.log('registraion in info updated in db', data);
                })

                const createdAt = result.user.metadata.creationTime;
                const newUser = { name, email, createdAt };

                // save new input data to the database
                fetch('http://localhost:4000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            alert('User created in DB successfully');
                            console.log('user created in DB successfully');
                        }
                    })
            })
            .catch(error => {
                console.log('error', error)
            })
    }
    return (
        <div>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content ">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <h1 className='text-center md:text-3xl md:pb-12 md:pt-4 md:font-extrabold'>Register Now!</h1>
                        <form onSubmit={handleRegistration} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Registration</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;