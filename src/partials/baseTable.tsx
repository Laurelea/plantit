import {MouseEventHandler, useEffect, useState} from 'react';
import { API_URL } from "../config";
import { updateBase } from "../store/actions";
import { connect } from "react-redux";
import { IReduxState, Irow } from "../store/types";
import React from 'react';
const axios = require('axios').default;

export const getMyBase = async () => {
    console.log("ALLBASE State empty");
    const response = await axios({
        method: 'get',
        url: API_URL + 'api/getbase'
    })
        .catch((error: any) => {
            console.log(error);
        })
    return response.data.rows
}

// interface IDictionary<T, C> {
//     [key: string]: T | C;
// }

interface IBaseProps {
    dbToPrint: undefined | Array<Irow>,
    updateBase: () => void,
    sortkey?: string,
}

const compareNullable = (a: Irow, b: Irow, sortkey: keyof Irow): number => {
    if (a[sortkey] === b[sortkey]) return 0;
    if (a[sortkey]  === null) return -1;
    if (b[sortkey]  === null) return 1;
    return a[sortkey]  < b[sortkey]  ? 1 : -1;
};
// const compareNullable = (a: IDictionary<string, number>, b: IDictionary<string, number>, sortkey: string ): number => {
//     if (a[sortkey] === b[sortkey]) return 0;
//     if (a[sortkey]  === null) return -1;
//     if (b[sortkey]  === null) return 1;
//     return a[sortkey]  < b[sortkey]  ? 1 : -1;
// };

interface ITableState {
    sortKey: string,
    sortOrder: boolean,
}
interface ISortButton {
    onClick: MouseEventHandler<HTMLButtonElement>,
    sortKey: string | number,
}

const Table = (props: IBaseProps) => {
    useEffect(() => {
        props.updateBase();
    }, [])
    console.log('allbase props:', props);

    const [state, setState] = useState<ITableState>({
        sortKey: 'category',
        sortOrder: false,
    })

    const Sort = (sortKey: string) => {
        setState ({
            ...state,
            sortKey: sortKey,
            sortOrder: !state.sortOrder,
        })
    }
    // onClick: MouseEventHandler<HTMLButtonElement>, sortKey: string | number
    const SortButton = ({onClick, sortKey}: ISortButton) => {
        return (
            <button onClick={onClick}>
                {state.sortKey == sortKey
                    ? state.sortOrder
                        ? ' 🔽'
                        : ' 🔼'
                    : ''
                }
            </button>
        )
    }

    const headers = [
        {
            label: "ID",
            id: "id",
        },
        {
            label: "Категория",
            id: "category",
        },
        {
            label: "Растение",
            id: "product_name",
        },
        {
            label: "Сорт",
            id: "name",
        },
        {
            label: "Производитель",
            id: "producer_name",
        }
        ,
        {
            label: "Добавил",
            id: "user_name",
        }
    ]
    if (props.dbToPrint) {
        return (
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            {headers.map((row) => {
                                            return (
                                                <th key={row.id}>
                                                    {row.label}
                                                    <span>
                                                        <SortButton sortKey={row.id} onClick={() => Sort(row.id)}/>
                                                    </span>
                                                </th>
                                            )
                                        })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.dbToPrint.sort((a, b) => (
                            compareNullable(a, b, state.sortKey) * (state.sortOrder ? -1 : 1)
                        )).map((item: any, key: number) => {
                            return (
                                <tr key={key}>
                                    <td>{item.id}</td>
                                    <td>{item.category}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.name}</td>
                                    <td>{item.producer_name}</td>
                                    <td>{item.user_name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                            </table>
            </React.Fragment>
        )
    } else {
        return (<p> no props </p>)
    }

}

const mapStateToProps = (state: IReduxState) => ({
    dbToPrint: state.dbToPrint
})

const mapDispatchToProps = ({
    updateBase,
})

const BaseTable = connect(mapStateToProps, mapDispatchToProps)(Table);

export default BaseTable
