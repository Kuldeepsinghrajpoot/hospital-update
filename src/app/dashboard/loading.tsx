import Swal from 'sweetalert2';

export default function showLoading() {
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

