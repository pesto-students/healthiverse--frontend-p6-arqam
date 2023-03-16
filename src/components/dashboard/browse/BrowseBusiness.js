import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusiness } from "../../../slices/businessMembership";

const BrowseBusiness = () => {
    const { isLoading, gyms, trainers, dieticians } = useSelector((state) => state.businessAndMembership);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBusiness())
            .unwrap()
            .catch((err) => {
                const _content = (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                    err.message || err.toString();
                console.log(_content);
            });
    }, [])

    return (
        <div className="container">
            <div className="gyms">
                <h3>Gyms</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((gyms.length === 0) ?
                        (<p>No gyms found</p>) :
                        (gyms.map((item, index) => {
                            return (<li key={index}>{item.name}</li>)
                        })
                        )
                    )
                }

            </div>
            <div className="trainers">
                <h3>Trainers</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((trainers.length === 0) ?
                        (<p>No trainers found</p>) :
                        (trainers.map((item, index) => {
                            return (<li key={index}>{item.name}</li>)
                        })
                        )
                    )
                }
            </div>
            <div className="dieticians">
                <h3>Dieticians</h3>
                {isLoading ?
                    (<p>Loading...</p>) :
                    ((dieticians.length === 0) ?
                        (<p>No dieticians found</p>) :
                        (dieticians.map((item, index) => {
                            return (<li key={index}>{item.name}</li>)
                        })
                        )
                    )
                }
            </div>

        </div>
    );
}

export default BrowseBusiness;