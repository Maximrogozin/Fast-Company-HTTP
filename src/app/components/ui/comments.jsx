import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    deleteComment,
    getComments,
    getCommentsLoadStatus,
    loadCommentsList
} from "../../store/comments";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadStatus());
    const comments = useSelector(getComments());
    const id = useSelector(getCurrentUserId());
    const handleSubmit = (data) => {
        dispatch(
            createComment({
                ...data,
                _id: nanoid(),
                pageId: userId,
                created_at: Date.now(),
                userId: id
            })
        );
    };
    const handleRemoveComment = (id) => {
        dispatch(deleteComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
