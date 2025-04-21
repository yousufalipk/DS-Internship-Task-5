import * as Yup from 'yup';

const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

const MAX_FILE_SIZE = 102400; //100KB

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

export const blogSchema = Yup.object({
    title: Yup.string().min(10).max(50).required('Tile is required!'),
    content: Yup.string().min(100).max(5000).required('Content is required!'),
    photo: Yup.mixed()
        .required("Photo is required!")
        .test("is-valid-type", "Not a valid image type",
            value => isValidFileType(value && value.name.toLowerCase(), "image"))
        .test("is-valid-size", "Max allowed size is 100KB",
            value => value && value.size <= MAX_FILE_SIZE)
});
