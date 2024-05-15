export const DEFAULT_AMOUNT = 1;
export const INIT_NB_MEAL = 2;
export const INPUT_DATE_VIEW = 1;
export const INPUT_MEAL_VIEW = 2;
export const INPUT_OTHER_VIEW = 3;
export const OUTPUT_MEAL_VIEW = 4;
export const INPUT_RECIPE_VIEW = 5;
export const INPUT_INGREDIENT_VIEW = 6;
export const INPUT_PRODUCT_VIEW = 7
export const SEARCH_RECIPE_VIEW = 8;
export const EDIT_RECIPE_VIEW = 9;
export const TOAST_TIMER = "1000";
export const TOAST_SUCCESS_MESSAGE = "Elements ajoutés avec succès !";
export const TOAST_ERROR_MESSAGE = "Une erreur s'est produite.";
export const TOAST_SUCCESS_STYLE = "success-import-json-file";
export const TOAST_ERROR_STYLE = "error-import-json-file";
export const SUBMIT_INPUT_DATE_VIEW = "submit-input-date-view";
export const SUBMIT_RECIPE_VIEW = "submit-input-recipe-ingredient-view";
export const SUBMIT_INGREDIENT_VIEW = SUBMIT_RECIPE_VIEW;
export const DEFAULT_MAX_INGREDIENT = 100;
export const DEFAULT_NB_MEAL = 1;
export const MAX_NB_MEAL = 5;
export const LIMIT_LINE_MEAL_PDF = 17;
export const LIMIT_LINE_SHOPPING_PDF = 66;

export const TMP_RECIPES = [
    {
        name: "Burger",
        description: "Un excellent Burger !",
        ingredients: [
            {
                id: 0,
                amount: 1
            },
            {
                id: 1,
                amount: 1
            },
            {
                id: 2,
                amount: 1
            },
            {
                id: 3,
                amount: 2
            },
            {
                id: 4,
                amount: 4
            }
        ]
    },
    {
        name: "Pate / Sauce tomate",
        description: "Un de mes plats préférés !",
        ingredients: [
            {
                id: 5,
                amount: 1
            },
            {
                id: 6,
                amount: 1
            },
            {
                id: 7,
                amount: 1
            },
            {
                id: 8,
                amount: 1
            }
        ]
    },
    {
        name: "Salade Poivrons",
        description: "Une salade originale et rafraîchissante !",
        ingredients: [
            {
                id: 9,
                amount: 3
            },
            {
                id: 10,
                amount: 1
            },
            {
                id: 1,
                amount: 2
            },
            {
                id: 11,
                amount: 1
            }
        ]
    },
    {
        name: "Maïs Thon",
        description: "Une salade originale et rafraîchissante !",
        ingredients: [
            {
                id: 9,
                amount: 3
            },
            {
                id: 10,
                amount: 1
            },
            {
                id: 1,
                amount: 2
            },
            {
                id: 11,
                amount: 1
            }
        ]
    }
];

export const TMP_INGREDIENTS = [
    {
        name: "Salade",
        price: 1.00
    },
    {
        name: "Tomate",
        price: 0.50
    },
    {
        name: "Oignon",
        price: 0.65
    },
    {
        name: "Steack",
        price: 7.29
    },
    {
        name: "Pain Burger",
        price: 5.57
    },
    {
        name: "Pate Coquillettes",
        price: 0.45
    },
    {
        name: "Sauce Tomate",
        price: 2.00
    },
    {
        name: "Magie / Cube Kubor",
        price: 4.50
    },
    {
        name: "Beurre",
        price: 1.59
    },
    {
        name: "Poivron",
        price: 1.50
    },
    {
        name: "Barquette Betterave",
        price: 2.00
    },
    {
        name: "Vinaigrette Puget",
        price: 2.20
    }
];

export const TMP_MEALS = [
    {
        id: 0,
        name: "Burger",
        amount: 1
    },
    {
        id: 1,
        name: "Pate / Sauce tomate",
        amount: 2
    },
    {
        id: 2,
        name: "Salade Poivrons",
        amount: 3
    },
]

export const TMP_LIST_INGREDIENTS_INPUT = [
    {
        id: 11,
        name: "Vinaigrette Puget",
        amount: 2
    },
    {
        id: 2,
        name: "Oignon",
        amount: 3
    },
    {
        id: 5,
        name: "Pattes Coquilette",
        amount: 62
    },
    {
        id: 10,
        name: "Barquette Betterave",
        amount: 1
    }
]

export const JSON_FILE_SCHEMA = {
    "type": "object",
    "properties": {
        "ingredientList": {
            "type": "array",
            "required": true,
            "items": {
                "properties": {
                    "name": {
                        "type": "string",
                        "required": true
                    },
                    "price": {
                        "type": "number",
                        "required": true
                    }
                },
                "additionalProperties": false
            }
        },
        "productList": {
            "type": "array",
            "required": true,
            "items": {
                "properties": {
                    "name": {
                        "type": "string",
                        "required": true
                    },
                    "price": {
                        "type": "number",
                        "required": true
                    }
                },
                "additionalProperties": false
            }
        },
        "recipeList": {
            "type": "array",
            "required": true,
            "items": {
                "properties": {
                    "name": {
                        "type": "string",
                        "required": true
                    },
                    "description": {
                        "type": "string",
                        "required": true
                    },
                    "ingredients": {
                        "type": "array",
                        "items": {
                            "properties": {
                                "id": {
                                    "type": "integer",
                                    "required": true
                                },
                                "amount": {
                                    "type": "integer",
                                    "required": true
                                }
                            }
                        }
                    }
                },
                "additionalProperties": false
            }
        }
    },
    "additionalProperties": false
}