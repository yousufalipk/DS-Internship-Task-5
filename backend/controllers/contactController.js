import ContactModel from '../schemas/contact.js';

export const sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newMessage = new ContactModel({
            name: name,
            email: email,
            message: message
        });

        await newMessage.save();

        return res.status(200).json({
            status: 'success',
            message: 'Message sent succesfully!'
        })
    } catch (error) {
        console.log('Internal Server Error', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}