import React, { useEffect, useReducer } from 'react';

/**
 * Initialize state
*/

const initialState = {
    show: 'all',
    name: '',
    status: '',
    tableData: []
}

/**
 * Action declaration
*/

const ActionType = {
    SET_SHOW: "SET_SHOW",
    SET_NAME: "SET_NAME",
    SET_STATUS: "SET_STATUS",
    SET_TABLE_DATA: "SET_TABLE_DATA"
}

/**
 * Reducer action 
*/

const stateReducer = (state, action) => {
    switch (action.type) {
        case ActionType.SET_SHOW:
            return {
                ...state,
                show: action.payload
            }

        case ActionType.SET_NAME:
            return {
                ...state,
                name: action.payload
            }

        case ActionType.SET_STATUS:
            return {
                ...state,
                status: action.payload
            }

        case ActionType.SET_TABLE_DATA:
            return {
                ...state,
                tableData: action.payload
            }

        default:
            return initialState;
    }
}

const Problem1 = () => {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    /**
     * State  
    */

    const {
        show,
        name,
        status,
        tableData

    } = state

    /**
     * SideEffect for data store
    */

    useEffect(() => {
        let dt = JSON.parse(localStorage.getItem('localData'));
        dispatch({ type: ActionType.SET_TABLE_DATA, payload: dt ? sortArray(dt) : [] })
    }, [])

    /**
     * Status Button functionality
    */

    const handleClick = (val) => {
        dispatch({ type: ActionType.SET_SHOW, payload: val })
        let items = [...sortArray(JSON.parse(localStorage.getItem('localData')))];
        if (val === "active" && items.length > 0) {
            dispatch({ type: ActionType.SET_TABLE_DATA, payload: items.filter(a => a.status.toLowerCase() === "active") })
        }
        else if (val === "completed" && items.length > 0) {
            dispatch({ type: ActionType.SET_TABLE_DATA, payload: items.filter(a => a.status.toLowerCase() === "completed") })
        }
        else {
            dispatch({ type: ActionType.SET_TABLE_DATA, payload: items })
        }
    }


    /**
     * Data submit handler
    */

    const handleSubmit = () => {
        let data = JSON.parse(localStorage.getItem('localData'));
        let items = [];
        if (data === null) {
            items = [...allData];
            items.push({ name: name, status: status });
        }
        else {
            items = [...data]
            items.push({ name: name, status: status });
        }
        dispatch({ type: ActionType.SET_TABLE_DATA, payload: items })
        localStorage.setItem('localData', JSON.stringify(items));
    }


    const sortArray = (data) => {
        return data.sort(function (a, b) {
            if (a.status.toLowerCase() < b.status.toLowerCase()) {
                return -1;
            }
            if (a.status.toLowerCase() > b.status.toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                onChange={(e) => dispatch({ type: ActionType.SET_NAME, payload: e.target.value })}
                                value={name}
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                onChange={(e) => dispatch({ type: ActionType.SET_STATUS, payload: e.target.value })}
                                value={status}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.length > 0 && tableData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;