import { useEffect, useState } from 'react';
// import {MouseEventHandler, useEffect, useState} from 'react';
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

interface ITableState {
    sortKey: string,
    sortOrder: boolean,
    filterType: string | undefined,
    filterValue: string,
}
// interface ISortButton {
//     // onClick: MouseEventHandler<HTMLButtonElement>,
//     sortKey: string | number,
// }

const Table = (props: IBaseProps) => {
    useEffect(() => {
        props.updateBase();
        // eslint-disable-next-line
    }, [])
    console.log('allbase props:', props);

    //Это переделать на забор из БД
    const Categories: {[index: string]: string} = {
        All: "Все растения",
        Vegs: "Овощи",
        Fruit: "Фрукты",
        Decs: "Декоративные",
        Herbs: "Травы",
    }

    const [state, setState] = useState<ITableState>({
        sortKey: 'id',
        sortOrder: false,
        filterType: undefined,
        filterValue: 'none',
    })

    const Sort = (sortKey: string) => {
        setState ({
            ...state,
            sortKey: sortKey,
            sortOrder: !state.sortOrder,
        })
    }
    // onClick: MouseEventHandler<HTMLButtonElement>, sortKey: string | number
    // const SortButton = ({ sortKey }: ISortButton) => {
    //     return (
    //         <button>
    //             {state.sortKey === sortKey
    //                 ? state.sortOrder
    //                     ? ' 🔽'
    //                     : ' 🔼'
    //                 : ''
    //             }
    //         </button>
    //     )
    // }

    const filterOn = ({type, value}: {type : string | undefined, value: string}) => {

        console.log('96 state', type, value)
        setState({
            ...state,
            filterType: type,
            filterValue: value,
        })
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
                <table id="baseTable">
                    <caption>{
                        state.filterValue === 'none'
                            ? Categories['All']
                            : state.filterType === 'category'
                                ? Categories[state.filterValue]
                                : state.filterValue}</caption>
                    <thead>
                        <tr>
                            {headers.map((row) => {
                                return (
                                    <th key={row.id}>
                                        <p onClick={() => Sort(row.id)}>
                                            {row.label}
                                            <span>
                                                {state.sortKey === row.id
                                                    ? state.sortOrder
                                                        ? <img src="https://img.icons8.com/ios-filled/20/26e07f/sort-down.png"/>
                                                        : <img src="https://img.icons8.com/ios-filled/20/26e07f/sort-up.png"/>
                                                    : <img src="https://img.icons8.com/ios-filled/20/26e07f/sort.png"/>
                                                }
                                            </span>
                                        </p>

                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.dbToPrint
                            .sort((a, b) => (
                            compareNullable(a, b, state.sortKey) * (state.sortOrder ? -1 : 1)
                        ))
                            .filter((item: Irow) => {
                                console.log('164 state', state)
                                if (state.filterType === undefined) {
                                    return true
                                } else {
                                    return item[state.filterType] === state.filterValue
                                }
                            })
                            .map((item: any, key: number) => {
                            return (
                                <tr key={key}>
                                    <td onClick={() => filterOn({type: undefined, value: 'none'})}>{item.id}</td>
                                    <td onClick={() => filterOn({type: 'category', value: item.category})}>{item.category}</td>
                                    <td onClick={() => filterOn({type: 'product_name', value: item.product_name})}>{item.product_name}</td>
                                    <td onClick={() => filterOn({type: 'name', value: item.name})}>{item.name}</td>
                                    <td onClick={() => filterOn({type: 'producer_name', value: item.producer_name})}>{item.producer_name}</td>
                                    <td onClick={() => filterOn({type: 'user_name', value: item.user_name})}>{item.user_name}</td>
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
