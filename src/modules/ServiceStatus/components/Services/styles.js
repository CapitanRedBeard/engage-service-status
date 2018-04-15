const Colors = {
    successBorder: '#A0FFA0',
    successBackground: '#A0FFA0'
}

const baseCardStyles = {
    flex: 1,
    'min-width': '350px',
    margin: '10px 20px',

}

const styles = {
    loaded: {
        ...baseCardStyles,
        'border-color': Colors.successBorder,
        'background-color': Colors.successBorder,
    },
    unloaded: {
        ...baseCardStyles,
    }
}

export default styles