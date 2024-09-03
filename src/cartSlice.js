
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: { listSP: [] },
    reducers: {
        themSP: (state, action) => {
            let sp = action.payload; // tham số là sp = {'id':1,'ten_sp'=>'A'}
            let index = state.listSP.findIndex(s => s.id === sp.id);
            if (index === -1) { // sp chưa có trong giỏ hàng
                sp['so_luong'] = 1;
                state.listSP.push(sp);
            } else {
                state.listSP[index]['so_luong']++;
                console.log("Đã thêm sp. Số SP=", state.listSP.length);
            }
        },
        suaSL: (state, action) => { // tham số là mảng 2 phần tử id và sl. VD [5000, 3]
            let id = action.payload[0];
            let so_luong = action.payload[1];
            let index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) state.listSP[index].so_luong = Number(so_luong);
            console.log("Đã sửa sp ", action.payload);
        },
        xoaSP: (state, action) => { // tham số là id_sp
            let id = action.payload;
            const index = state.listSP.findIndex(s => s.id === id);
            if (index !== -1) state.listSP.splice(index, 1);
        },
        xoaGH: state => { state.listSP = []; }
    }
});

export const { themSP, suaSL, xoaSP, xoaGH } = cartSlice.actions;
export default cartSlice.reducer;
