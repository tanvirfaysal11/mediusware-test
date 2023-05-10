import React, { useEffect, useState } from 'react';
import AllContactsModal from './AllContactsModal';
import UsContactsModal from './UsContactsModal';


const Problem2 = () => {

    /**
     * State section 
    */

    const [toggleAllContactsModal, setToggleAllContactsModal] = useState(false);
    const [toggleUsContactsModal, setToggleUsContactsModal] = useState(false);
    const [allContactsData, setAllContactsData] = useState([]);
    const [usContactsData, setUsContactsData] = useState([]);

    /**
     * SideEffect for get data from restAPI start
    */

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const items = await (
                await fetch(
                    "https://contact.mediusware.com/api/contacts/?page=1&page_size=10"
                )
            ).json();

            // set state when the data received
            setAllContactsData(items ? items.results : []);
        };

        const usDataFetch = async () => {
            const items = await (
                await fetch(
                    "https://contact.mediusware.com/api/country-contacts/United%20States/?page=1&page_size=10"
                )
            ).json();

            // set state when the data received
            setUsContactsData(items ? items.results : []);
        };

        usDataFetch();
        dataFetch();
    }, []);

    /**
     * SideEffect for get data from restAPI end
    */

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={() => setToggleAllContactsModal(true)} >All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={() => setToggleUsContactsModal(true)}>US Contacts</button>
                </div>
                <AllContactsModal show={toggleAllContactsModal} showAnother={setToggleUsContactsModal} setShow={setToggleAllContactsModal} data={allContactsData} />
                <UsContactsModal show={toggleUsContactsModal} showAnother={setToggleAllContactsModal} setShow={setToggleUsContactsModal} data={usContactsData} />
            </div>
        </div>
    );
};

export default Problem2;