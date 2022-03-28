import { ChangeEvent, useEffect, useState } from 'react';
import { updateBase } from "../store/actions";
import { connect } from "react-redux";
import { IReduxState, Irow } from "../store/types";
import React from 'react';

interface IBaseProps {
    dbToPrint: undefined | Irow[],
    updateBase: () => void,
    sortkey?: string,
}

interface ITableState {
    sortKey: keyof Irow,
    sortOrder: boolean,
    filterType: string | undefined,
    filterValue: string,
    page: number,
    elemPerPage: number,
    loading: boolean,
    baseToShow: Irow[] | undefined,
    // curNumOfPages: number,
}

interface IPagination{
    elemPerPage: number,
    totalElems: number,
    paginate: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
}

const compareNullable = (a: Irow, b: Irow, sortkey: keyof Irow): number => {
    if (a[sortkey] === b[sortkey]) return 0;
    if (a[sortkey]  === null) return -1;
    if (b[sortkey]  === null) return 1;
    return a[sortkey]  < b[sortkey]  ? 1 : -1;
};

//Это переделать на забор из БД
const Categories: {[index: string]: string} = {
    All: "Все растения",
    Vegs: "Овощи",
    Fruit: "Фрукты",
    Decs: "Декоративные",
    Herbs: "Травы",
}

const Table = (props: IBaseProps) => {
    // useEffect(() => {
    //     props.updateBase();
    // }, [])
    // console.log('allbase props:', props);

    const [state, setState] = useState<ITableState>({
        sortKey: 'id',
        sortOrder: false,
        filterType: undefined,
        filterValue: 'none',
        page: 1,
        elemPerPage: 15,
        loading: false,
        baseToShow: props.dbToPrint,
    })

    useEffect(() => {
        setState({
            ...state,
            baseToShow: props.dbToPrint
                ? props.dbToPrint
                    .sort((a, b) => (
                        compareNullable(a, b, state.sortKey) * (state.sortOrder ? -1 : 1)
                    ))
                    .filter((item: Irow) => {
                        if (state.filterType === undefined) {
                            return true
                        } else {
                            return item[state.filterType] === state.filterValue
                        }
                    })
                : undefined
        })
    }, [props.dbToPrint, state.sortKey, state.sortOrder, state.filterType, state.page, state.elemPerPage])

    const lastIndex = state.page * state.elemPerPage;
    const firstIndex = lastIndex - state.elemPerPage;
    const currentElem = state.baseToShow ? state.baseToShow.slice(firstIndex, lastIndex) : undefined
    const paginate = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        setState({
            ...state,
            page: Number(event.currentTarget.innerHTML)
        })
    }

    const changeMaxElems = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log('131', event.target.value)
        setState({
            ...state,
            elemPerPage: Number(event.target.value)
        })
    }

    const Pagination = ({ elemPerPage, totalElems, paginate} : IPagination) => {
        const pageNumbers = [];
        for (let elem = 1; elem <= Math.ceil(totalElems / elemPerPage); elem++) {
            pageNumbers.push(elem)
        }
        const changePage = (value: number) => {
            const calcValue = state.page + value
            setState({
                ...state,
                page: calcValue === 0
                ? 1
                : Math.min(calcValue, pageNumbers.length)
            })
        }

        return (
            <div>
                <ul className="pagination">
                    {
                        pageNumbers.map(number => (
                            <li className='page-item' key={number}>
                                {state.page === number
                                ? <a href="!#" className="active-page" onClick={paginate}>{number}</a>
                                : <a href="!#" className="page-link" onClick={paginate}>{number}</a>
                                }
                            </li>
                        ))
                    }
                </ul>
                    <select id="elems" name="elems" onChange={changeMaxElems}>
                        <option value=""></option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                <button className="btn-primary" onClick={() => changePage(-1)} disabled={state.page === 1}>Prev Page</button>
                <button className="btn-primary" onClick={() => changePage(1)} disabled={state.page === pageNumbers.length}>Next Page</button>
            </div>
        )
    }

    const Sort = (sortKey: keyof Irow) => {
        setState ({
            ...state,
            sortKey: sortKey,
            sortOrder: !state.sortOrder,
            page: 1,
        })
    }

    const filterOn = ({type, value}: {type : string | undefined, value: string}) => {

        console.log('96 state', type, value)
        setState({
            ...state,
            filterType: type,
            filterValue: value,
            page: 1,
        })
    }
    const headers = [
        {
            label: "ID",
            id: "id",
        },
        {
            label: "Категория",
            id: "cat_name",
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
    if (currentElem) {
        return (
            <React.Fragment>
                <table id="baseTable">
                    <caption>{
                        state.filterValue === 'none'
                            ? Categories['All']
                            : state.filterValue
                    }</caption>
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
                                                        ? <img src="https://img.icons8.com/ios-filled/20/26e07f/sort-down.png" alt=''/>
                                                        : <img src="https://img.icons8.com/ios-filled/20/26e07f/sort-up.png" alt=''/>
                                                    : <img src="https://img.icons8.com/ios-filled/20/26e07f/sort.png" alt=''/>
                                                }
                                            </span>
                                        </p>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {currentElem
                            .map((item: any, key: number) => {
                            return (
                                <tr key={key} className='table-row'>
                                    <td onClick={() => filterOn({type: undefined, value: 'none'})}>{item.id}</td>
                                    <td onClick={() => filterOn({type: 'cat_name', value: item.cat_name})}>{item.cat_name}</td>
                                    <td onClick={() => filterOn({type: 'product_name', value: item.product_name})}>{item.product_name}</td>
                                    <td onClick={() => filterOn({type: 'name', value: item.name})}>{item.name}</td>
                                    <td onClick={() => filterOn({type: 'producer_name', value: item.producer_name})}>{item.producer_name}</td>
                                    <td onClick={() => filterOn({type: 'user_name', value: item.user_name})}>{item.user_name}</td>
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
                <Pagination elemPerPage={state.elemPerPage} totalElems={state.baseToShow ? state.baseToShow.length : 0} paginate={paginate}/>
            </React.Fragment>
        )
    } else {
        return (<p> no current elem </p>)
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
