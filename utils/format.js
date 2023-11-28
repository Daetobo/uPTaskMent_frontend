const formatName = (name) => {
    const palabras = name.split(' ')

    if (palabras.length === 1) {
        return palabras[0][0].toUpperCase()
    }

    const inicial = palabras[0][0].toUpperCase();
    const final = palabras[palabras.length - 1][0].toUpperCase()

    return inicial + final

}

const formatDateMMDD = (date) => {
    const objetDate = new Date(date)
    const day = objetDate
        .toLocaleString('es-CO',{day:'2-digit'})
        .padStart(2,'0') // Asegura que siempre tenga dos dígitos
    const month = objetDate.toLocaleString('es-CO',{month: 'short'}).split('.')[0];
    return day + ' ' + month
}

const formatDate = (date) => {
    const objetDate = new Date(date);

    const year = objetDate.getFullYear();
    const month = (objetDate.getMonth() + 1).toString().padStart(2, '0'); // Asegura que el mes tenga dos dígitos
    const day = objetDate.getDate().toString().padStart(2, '0'); // Asegura que el día tenga dos dígitos

    return `${year}-${month}-${day}`;
}


export {
    formatName,
    formatDateMMDD,
    formatDate
}