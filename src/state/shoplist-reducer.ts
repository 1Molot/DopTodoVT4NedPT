import {FilterValue, ShoplistsType} from "../Typisation";
import {v1} from "uuid";

export const shoplistReducer = (state: ShoplistsType[], action: TsarAction): ShoplistsType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER-VALUE': {
            // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, filter: filter} : el))
            return state.map(el => el.id === action.payload.shoplistId ? {...el, filter: action.payload.filter} : el)
        }
        case "DELETE-SHOPLIST": {
            // setShoplists(shoplists.filter(el => el.id !== shoplistId))
            return state.filter(el => el.id !== action.payload.shoplistId)
        }
        case "ADD-SHOPLIST": {
            // let NewShoplistId = v1()
            // let newShopList: ShoplistsType = {id: NewShoplistId, title: shoplistTitle, filter: "All"}
            // setShoplists([
            //     ...shoplists,
            //     newShopList
            // ])
            const newShoplist: ShoplistsType = {
                id: action.payload.shoplistId,
                title: action.payload.shoplistTitle,
                filter: 'All'
            }
            return [...state, newShoplist]
        }
        case "UPDATE-SHOPLIST-TITLE": {
            // setShoplists(shoplists.map(el => el.id === shoplistId ? {...el, title: newTitle} : el))
            return state.map(el => el.id === action.payload.shoplistId ? {...el, title: action.payload.newTitle} : el)
        }
        default:
            return state
    }
}

export type TsarAction = ChangeFilterValueACType | deleteShopListACType | AddShopListACType | updateShoplistTitleACType
export type ChangeFilterValueACType = ReturnType<typeof changeFilterValueAC>
export type AddShopListACType = ReturnType<typeof addShopListAC>
export type updateShoplistTitleACType = ReturnType<typeof updateShoplistTitleAC>
export type deleteShopListACType = ReturnType<typeof deleteShopListAC>

export const changeFilterValueAC = (shoplistId: string, filter: FilterValue) => {
    return {
        type: 'CHANGE-FILTER-VALUE',
        payload: {
            shoplistId,
            filter
        }
    } as const
}

export const deleteShopListAC = (shoplistId: string) => {
    return {
        type: 'DELETE-SHOPLIST',
        payload: {
            shoplistId
        }
    } as const
}

export const addShopListAC = (shoplistTitle: string) => {
    return {
        type: 'ADD-SHOPLIST',
        payload: {
            shoplistTitle,
            shoplistId: v1()
        }
    } as const
}

export const updateShoplistTitleAC = (shoplistId: string, newTitle: string) => {
    return {
        type: 'UPDATE-SHOPLIST-TITLE',
        payload: {
            shoplistId,
            newTitle
        }
    } as const
}