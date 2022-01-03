import { current } from '@reduxjs/toolkit';
import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { isFunctionDeclaration } from 'typescript';
import { fetchPostsFeed, fetchPostsType } from '../../features/post/postSlice';
import Posts from '../Feed/Posts';

const TextArea = ({ currentValue, placeholder, rows, handleUpdate }:any) => {
    //used to update textArea with a ref that infers the type (textarea)
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const txHeight = 44;

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            const scrollHeight = textareaRef.current.scrollHeight;
            let currentV = currentValue;
            //add initial height of text area by checking if text-area value / text is empty
            if (currentV === "") {
            textareaRef.current.style.height = txHeight + "px";
            textareaRef.current.style.overflowY = "hidden";
            }
        }
      });

      const handleChange = (value: string) => {
        {handleUpdate(value)};
    };

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [currentValue]);


    return (
            <textarea ref={textareaRef} value={currentValue} onChange={e => { handleChange(e.target.value) }} id="text" name="post" className="w-full h-6 p-2 text-lg text-black transition bg-white rounded-md resize-none focus:outline-none focus:ring-opacity-10 char-limiter" maxLength={280} placeholder={placeholder} rows={rows} spellCheck="false"></textarea>
    )
}

export default TextArea;