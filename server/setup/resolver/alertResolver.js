import Alert from '../../models/alertinfo.js'

export default {
    alert: async (res,req, alertId) => {
        const alertinfo = await Alert.findOne({_id: alertId});
        if (!alertinfo) {
            throw new Error('Error')
        }
        return alertinfo
    },
    createalert: async (args) => {
        try {
            const existingalert = await Alert.findOne({ alertId: args.userInput.alertId});
            if (existingalert) {
                throw new Error('Alert exists already');
            }
            const alert = new Alert({
                alertId: args.userInput.alertId,
                alertStatus: args.userInput.alertStatus,
            })
        } catch (err) {
            throw err;
        }
    }
}