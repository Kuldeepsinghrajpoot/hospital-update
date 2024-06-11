import Swal from 'sweetalert2';

function loading() {
  Swal.fire({
    title: 'Please wait...',
    text: 'Logging in...',
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    }
  });

  
}

export default loading
