import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backendAPIs from "../api/backendAPIs.js";
import store from "../app/store.js";

const initialState = {
    products: null,
    product: [],
    isFiltered: null,
    isSearched: null,
    searchedProducts: null,
    filteredProducts: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: null,
}

export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async (thunkAPI) => {
        try {
            return await backendAPIs.getAllProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const categoryProducts = createAsyncThunk(
    'products/categoryProducts',
    async (data, thunkAPI) => {
        try {
            return await backendAPIs.categoryProducts(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (id, thunkAPI) => {
        try {
            return await backendAPIs.getProductById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await backendAPIs.addProduct(data, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (search, thunkAPI) => {
        const isFiltered = thunkAPI.getState().products.isFiltered;
        const products = thunkAPI.getState().products.products;
        const filteredProducts = thunkAPI.getState().products.filteredProducts;
        try {
            if (search === null) {
                return isFiltered ? filteredProducts : products;
            }

            const targetProducts = isFiltered ? filteredProducts : products;

            let filterProducts = targetProducts.filter((item) => {
                if (item.category?.toLowerCase().includes(search.toLowerCase()) || item.subCategory?.toLowerCase().includes(search.toLowerCase())
                    || item.Brand?.toLowerCase().includes(search.toLowerCase()) || item.Year?.toLowerCase().includes(search.toLowerCase())
                    || item.Fuel?.toLowerCase().includes(search.toLowerCase()) || item.Transmission?.toLowerCase().includes(search.toLowerCase())
                    || item.KMdriven?.toLowerCase().includes(search.toLowerCase()) || item.NoOfOwners?.toLowerCase().includes(search.toLowerCase())
                    || item.Title?.toLowerCase().includes(search.toLowerCase()) || item.Description?.toLowerCase().includes(search.toLowerCase())
                    || item.Price?.toLowerCase().includes(search.toLowerCase()) || item.Type?.toLowerCase().includes(search.toLowerCase())
                    || item.BHK?.toLowerCase().includes(search.toLowerCase()) || item.Bathrooms?.toLowerCase().includes(search.toLowerCase())
                    || item.Furnishing?.toLowerCase().includes(search.toLowerCase()) || item.ProjectStatus?.toLowerCase().includes(search.toLowerCase())
                    || item.ListedBy?.toLowerCase().includes(search.toLowerCase()) || item.Area?.toLowerCase().includes(search.toLowerCase())
                    || item.Maintenance?.toLowerCase().includes(search.toLowerCase()) || item.Length?.toLowerCase().includes(search.toLowerCase())
                    || item.Floors?.toLowerCase().includes(search.toLowerCase()) || item.Washrooms?.toLowerCase().includes(search.toLowerCase())
                    || item.FloorNo?.toLowerCase().includes(search.toLowerCase()) || item.MealsIncluded?.toLowerCase().includes(search.toLowerCase())
                    || item.CarParking?.toLowerCase().includes(search.toLowerCase()) || item.PhysicalCondition?.toLowerCase().includes(search.toLowerCase())
                    || item.Facing?.toLowerCase().includes(search.toLowerCase()) || item.RAM?.toLowerCase().includes(search.toLowerCase())
                    || item.ProjectName?.toLowerCase().includes(search.toLowerCase()) || item.Network?.toLowerCase().includes(search.toLowerCase())
                    || item.BaclelorsAllowed?.toLowerCase().includes(search.toLowerCase()) || item.Charger?.toLowerCase().includes(search.toLowerCase())
                    || item.Breadth?.toLowerCase().includes(search.toLowerCase()) || item.Storage?.toLowerCase().includes(search.toLowerCase())
                    || item.Receipt?.toLowerCase().includes(search.toLowerCase()) || item.BoxWithIMEI?.toLowerCase().includes(search.toLowerCase())
                    || item.SalaryPeriod?.toLowerCase().includes(search.toLowerCase()) || item.Position?.toLowerCase().includes(search.toLowerCase())
                    || item.SalaryFrom?.toLowerCase().includes(search.toLowerCase()) || item.SalaryTo?.toLowerCase().includes(search.toLowerCase()))
                    return item;
            })
            return filterProducts;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const filterProducts = createAsyncThunk(
    'products/filterProducts',
    async (data, thunkAPI) => {
        try {
            const temp = thunkAPI.getState().products.filteredProducts;
            const products = thunkAPI.getState().products.products;
            let filteredProducts = products.filter((item) => {
                if ((item.category == 'Cars')) {
                    if (((new Date().getFullYear() - parseFloat(item.Year)) <= parseFloat(data.Year[0])) || ((parseFloat(item.Price) >= parseFloat(data.minPrice)) && (parseFloat(item.Price) <= parseFloat(data.maxPrice))) ||
                        (data.Brand?.includes(item.Brand.toLowerCase())) || (data.Transmission?.includes(item.Transmission.toLowerCase())) || ((data.NoOfOwners?.includes(item.NoOfOwners))) ||
                        (data.Fuel?.includes(item.Fuel.toLowerCase())) || (parseFloat(item.KMdriven) <= parseFloat(data.KMdriven)) || (data.Model?.includes(item.Model.toLowerCase())))
                        return item;
                }
                else if (item.category == 'Properties') {
                    if (((parseFloat(item.Price) >= parseFloat(data.minPrice)) && (parseFloat(item.Price) <= parseFloat(data.maxPrice))) || (data.Type?.includes(item.Type.toLowerCase())) ||
                        (data.Furnishing?.includes(item.Furnishing.toLowerCase())) || (data.ProjectStatus?.includes(item.ProjectStatus.toLowerCase())) ||
                        (data.ListedBy?.includes(item.ListedBy.toLowerCase())) || (parseFloat(item.Area) >= parseFloat(data.Area)) ||
                        (parseFloat(item.BHK) >= parseFloat(data.BHK)) || (item.Bathrooms >= data.Bathrooms) || (parseFloat(item.CarParking) >= parseFloat(data.CarParking)) ||
                        (data.BaclelorsAllowed?.includes(item.BaclelorsAllowed.toLowerCase())))
                        return item;
                }
                else if (item.category == 'Mobiles') {
                    if (((parseFloat(item.Price) >= parseFloat(data.minPrice)) && (parseFloat(item.Price) <= parseFloat(data.maxPrice))) || (data.Brand?.includes(item.Brand.toLowerCase())) ||
                        (data.Model?.includes(item.Model.toLowerCase())) || ((new Date().getFullYear() - parseFloat(item.Year)) <= parseFloat(data.Year[0])) ||
                        (item.PhysicalCondition?.includes(data.PhysicalCondition.toLowerCase())) || (item.RAM?.includes(data.RAM.toLowerCase())) ||
                        (item.Storage?.includes(data.Storage.toLowerCase())) || (item.Network?.includes(data.Network.toLowerCase())) ||
                        (item.Charger?.includes(data.Charger.toLowerCase())) || (item.Receipt?.includes(data.Receipt.toLowerCase())) ||
                        (item.BoxWithIMEI?.includes(data.BoxWithIMEI.toLowerCase())) || (item.Type?.includes(data.Type.toLowerCase())))
                        return item;
                }
                else if (item.category == 'Jobs') {
                    if ((item.Type?.includes(data.Type.toLowerCase())) || (item.SalaryPeriod?.includes(data.SalaryPeriod.toLowerCase())))
                        return item;
                }
                else if (item.category == 'Bikes') {
                    if (((parseFloat(item.Price) >= parseFloat(data.minPrice)) && (parseFloat(item.Price) <= parseFloat(data.maxPrice))) || (data.Model?.includes(item.Model.toLowerCase())) ||
                        (data.Brand?.includes(item.Brand.toLowerCase())) || (parseFloat(item.KMdriven) <= parseFloat(data.KMdriven[0])) ||
                        ((new Date().getFullYear() - parseFloat(item.Year)) <= parseFloat(data.Year[0])))
                        return item;
                }
                else {
                    if (((parseFloat(item.Price) >= parseFloat(data.minPrice)) && (parseFloat(item.Price) <= parseFloat(data.maxPrice))))
                        return item;
                }
            })
            return filteredProducts
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: state => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
            state.isSearched = false;
            state.isFiltered = false;
            state.filteredProducts = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isFiltered = false;
                state.isSearched = false;
                state.products = action.payload.data;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(categoryProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoryProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload.data;
            })
            .addCase(categoryProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload.data;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                if(state.message=="jwt malformed")   state.message="Login before to continue...";
            })
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isSearched = true;
                state.searchedProducts = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(filterProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isFiltered = true;
                state.filteredProducts = action.payload;
            })
            .addCase(filterProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;