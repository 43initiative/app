export const branding = {
    splashScreen:require('../assets/img/43v8.jpg'),
    //registrationCornerImage:require('../assets/img/'),
    theme:'lightMode',
    set setTheme (theme)  {
        this.theme = theme;
    },
    get backgroundColor () {
        return this.theme === 'darkMode' ? 'white' : '#101010'
    },
    registrationThemeColor:'#101010',
    get forgotButton () {
        let ob = {fontWeight:'bold'}
        return this.theme === 'darkMode' ? {...ob,color:'white'} : {...ob,color:this.registrationThemeColor}

    }
}
