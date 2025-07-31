 import {PayPalButtons,PayPalScriptProvider} from "@paypal/react-paypal-js"

function PayPalButton({amount, onSuccess,onError}) {
  return (
    <PayPalScriptProvider options={{"client-id":import.meta.env.VITE_PAYPAL_CLIET_ID}}>
      <PayPalButton style={{layout:"vertical"}}
      createOrder={(data,actions)=>{
        return actions.order.create({
          purchase_units:[{amount:{value:parseFloat(amount).toFixed(2)}}]
        })
      }}
      onApprove={(data, actions)=>{
        return actions.order.capture().then(onSuccess)
      }}
      onError={onError}/>
    </PayPalScriptProvider>
  )
}

export default PayPalButton