export const game = {
    letters: [],
    word: "",
    inputWords: [],
    streak: 0,
    error: false,
    newGame: function()
    {
        this.letters = [];

        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const ramdomIndex = Math.floor(Math.random() * alphabet.length);
        this.letters = new Array(3).fill().map(function(letter)
        {
            const ramdomIndex = Math.floor(Math.random() * alphabet.length);
            return alphabet[ramdomIndex];
        })
        this.word = "";
        this.error = false;
        this.streak = 0
    },

    validateWord: async function (word)
    {
        for(let i= 0; i < this.letters.length; i++)
        {
            if(word.includes(this.letters[i]) === false)
            {
                this.error = true;
                return false;
            }
        }

        if(this.inputWords.includes(word))
        {
            console.log(this.inputWords);
            return false;
           
        }
        const rawDsts = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
        const data = await rawDsts.json();

        if(!data.length)
        {
            console.log("aa",this.inputWords);
            return false;
           
        }

        this.inputWords.push(word);
        this.streak++;
        return true;
    }
}