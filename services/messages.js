import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorage";
import api from "./axiosConfig";

export const getMessages = async (updateStateCallback) => {
    // Step 1: Check local storage for messages
    const cachedMessages = JSON.parse(getLocalStorageItem('messages'))
    if (cachedMessages) {
        // Return cached messages immediately
        updateStateCallback(cachedMessages)
    }

    // Step 2: Fetch from API and update local storage
    try {
        const res = await api.get('/messages')
        const { messages } = res.data
        setLocalStorageItem('messages', JSON.stringify(messages))

        // Update state with the new messages from the API
        updateStateCallback(messages)

        return messages
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error
    }
}

export const getMessage = async (id) => {
    try {
        const res = await api.get(`/messages/${id}`)
        return res.data
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error
    }
}

export const archiveMessage = async (id) => {
    try {
        const res = await api.put(`/messages/${id}/archive/`)
        return res.data
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error
    }
}

export const updateMessage = async (message) => {
    try {
        const res = await api.put(`/messages/${message._id}`, message)
        return res.data
    } catch (error) {
        console.error('Error updating message:', error);
        throw error
    }
}

export const createMessage = async (message) => {
    try {
        const res = await api.post(`/messages`, message)
        return res.data
    } catch (error) {
        console.error('Error creating message:', error);
        throw error
    }
}

export const getCategories = async () => {
    try {
        const res = await api.get('/messages/categories')
        return res.data
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error
    }
}

export const deleteMessage = async (id) => {
    try {
        const res = await api.delete(`/messages/${id}`)
        return res.data
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error
    }
}
