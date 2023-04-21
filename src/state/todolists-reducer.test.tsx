import {FilterValue, ShoplistsType} from "../Typisation";
import {v1} from "uuid";
import {
    addShopListAC,
    changeFilterValueAC, deleteShopListAC,
    shoplistReducer,
    updateShoplistTitleAC
} from "./shoplist-reducer";

let shoplistId1: string;
let shoplistId2: string;

let startState: Array<ShoplistsType>

beforeEach(() => {
    shoplistId1 = v1();
    shoplistId2 = v1();

    startState = [
        {id: shoplistId1, title: "What to buy", filter: "All"},
        {id: shoplistId2, title: "What to buy today", filter: "All"},
    ]
})

test('correct shoplist should be removed', () => {
    const endState = shoplistReducer(startState, deleteShopListAC(shoplistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(shoplistId2);
});

test('correct shoplist should be added', () => {
    const newTodolistTitle = "New shoplist";

    const endState = shoplistReducer(startState, addShopListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New shoplist");
    expect(endState[2].filter).toBe("All");
    expect(endState[2].id).toBeDefined();
});

test('correct shoplist should change its name', () => {
    const newTodolistTitle = "New shoplist title";

    const action = updateShoplistTitleAC(shoplistId2, newTodolistTitle);
    const endState = shoplistReducer(startState, action);

    expect(endState[0].title).toBe("What to buy");
    expect(endState[1].title).toBe("New shoplist title");
});

test('correct filter of shoplist should be changed', () => {
    let newFilter: FilterValue = "Bought";

    const action = changeFilterValueAC(shoplistId2, newFilter);
    const endState = shoplistReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe("Bought");
});


