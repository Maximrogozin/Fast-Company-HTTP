import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFaled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemove: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFaled,
    commentCreated,
    commentRemove
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFaled(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFaled(error.message));
    }
};

export const deleteComment = (id) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentRemove(id));
        }
    } catch (error) {
        dispatch(commentsRequestFaled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
