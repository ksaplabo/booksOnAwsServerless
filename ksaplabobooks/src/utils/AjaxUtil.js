// Ajax通信ライブラリ
import axios from 'axios';

export function getAllSapBooks() {
    //axios.defaults.withCredentials = true;
    //axios.defaults.xsrfHeaderName =  'X-CSRF-Token';

    const url = process.env.VUE_APP_SAP_BOOKS_SERVICE + '/getall';

    return axios.get(url , {
            params: {}
        }
    );

}

export function rentalBooks(title, yourname) {
    //axios.defaults.withCredentials = true
    //axios.defaults.xsrfHeaderName =  'X-CSRF-Token'

    const url = process.env.VUE_APP_SAP_BOOKS_SERVICE + '/update/rental';

    return axios.get(url , {
        params: {
                title: title ,
                yourname: yourname
            }
        }
    );
}

export function returnBooks(title) {
    //axios.defaults.withCredentials = true
    //axios.defaults.xsrfHeaderName =  'X-CSRF-Token'

    const url = process.env.VUE_APP_SAP_BOOKS_SERVICE + '/update/return';

    return axios.get(url , {
        params: {
                title: title 
            }
        }
    );
}

// takada
export function searchBooks(keyword) {
    // search url : google books api.
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + keyword.replace(' ','+');
    return axios.get(url);
}

export function addBook(title ,isbn ,description ,imgUrl){
    //axios.defaults.withCredentials = true
    //axios.defaults.xsrfHeaderName =  'X-CSRF-Token'

    const url = process.env.VUE_APP_SAP_BOOKS_SERVICE + '/add';

    return axios.get(url , {
        params: {
                title: title ,
                isbn: isbn ,
                description: description ,
                imgUrl: imgUrl  
            }
        }
    );
}

export function deleteBook(title){
    //axios.defaults.withCredentials = true
    //axios.defaults.xsrfHeaderName =  'X-CSRF-Token'

    const url = process.env.VUE_APP_SAP_BOOKS_SERVICE + '/delete';

    return axios.get(url , {
        params: {
                title: title 
            }
        }
    );
}