const mercadopago = require('mercadopago')

const createPay = async (req,res) => {
    console.log(req.body)
    try {
        mercadopago.configure({
            access_token: process.env.TOKEN_MERCADOPAGO
        });

        

           const preference = await mercadopago.preferences.create({
            items: [
                {
                  title: 'Compra Restaurante',
                  quantity: 1,
                  currency_id: 'ARS',
                  unit_price: 100.000
                }
              ],
              back_urls :{
                success:'http://localhost:2020/api/pay/success',
                pending:'http://localhost:2020/api/pay/pending',
                failure:'http://localhost:2020/api/pay/failure'
              }
          })
          console.log(preference)
          res.status(200).json({res: preference.body})

    } catch (error) {
        console.log(error)
    }
}

const responseSuccess = async(req, res) => {
    res.send('success')
}

const responsePending = async(req, res) => {
    res.send('pending')
}

const responseFailure = async(req, res) => {
    res.send('failure')
}


module.exports = {
    createPay,
    responseSuccess,
    responsePending,
    responseFailure
}