const mongoose  = require('mongoose');
const { transactionSchema } = require('./transactionSchema');


const AccountSummarySchema = mongoose.Schema(
  {
    monthAndYear: {
      type: String,
    },
    creditCardNumber:{
      type: String,
      required: true
    },
    previousBalance: {
      type: Number,
      required: true,
      default: 0
    },
    paymentCredits: {
      type: Number,
      required: true,
      default: 0
    },
    purchases: {
      type: Number,
      required: true,
      default: 0
    },
    feesCharged: {
      type: Number,
      required: true,
      default: 0
    },
    interestCharged: {
      type: Number,
      required: true,
      default: 0
    },
    newBalance: {
      type: Number,
      required: true,
      default: 0
    },
    pastDueAmount: {
      type: Number,
      required: true,
      default: 0
    },
    availableCredit: {
      type: Number,
      required: true,
      default: 0
    },
    openingDate: {
      type: Number,
      required: true,
      default: 1
    },
    closingDate: {
      type: Number,
      required: true,
      default: 30
    },
    daysInBillingCycle: {
      type: Number,
      required: true,
      default: 30
    }
  }
);

const PaymentInformationSchema = mongoose.Schema(
  {
    monthAndYear: {
      type: String,
    },
    creditCardNumber:{
      type: String,
      required: true
    },
    newBalance: {
      type: Number,
      required: true,
      default: 0
    },
    minPaymentDue: {
      type: Number,
      required: true,
      default: 0
    },
    paymentDueDate: {
      date:{
        type: Number,
        default: 15,
        required: true,
      },
      month: {
        type: Number,
        required: true,
        default: 4
      },
      year: {
        type: Number,
        required: true,
        default: 2021
      }
    }
  }
);

const RewardSummarySchema = mongoose.Schema(
  {
    monthAndYear: {
      type: String,
    },
    creditCardNumber:{
      type: String,
      required: true
    },
    prevRewardBalance: {
      type: Number,
      required: true,
      default: 0
    },
    rewardsEarnedThisMonth: {
      type: Number,
      required: true,
      default: 0
    },
    bonusRewards: {
      type: Number,
      required: true,
      default: 0
    },
    totalRewardsAvailable: {
      type: Number,
      required: true,
      default: 0
    }
  }
);

const AccountActivitySchema = mongoose.Schema(
  {
    monthAndYear: {
      type: String,
    },
    creditCardNumber:{
      type: String,
      required: true
    },
    transactions:[
      transactionSchema
    ]
  }
);

const TotalsYearToDateSchema = mongoose.Schema(
  {
    monthAndYear:{
      type: String,
    },
    creditCardNumber: {
      type: String,
      required: true
    },
    totalsCharged: {
      type: Number,
      required: true,
      default: 0
    },
    totalInterestCharged: {
      type: Number,
      required: true,
      default: 0
    }
  }
)

const StatementSchema = mongoose.Schema(
  {
    creditCardNumber: {type: String,required: true},
    monthAndYear: {type: String},
    accountSummary: AccountSummarySchema,
    paymentInformation: PaymentInformationSchema,
    rewardSummary: RewardSummarySchema,
    accountActivity: AccountActivitySchema,
    totalsYearToDate: TotalsYearToDateSchema,
  }
);
const AccountSummary = mongoose.model('AccountSummary',AccountSummarySchema);
const PaymentInformation = mongoose.model('PaymentInformation',PaymentInformationSchema);
const RewardSummary = mongoose.model('RewardSummary',RewardSummarySchema);
const AccountActivity = mongoose.model('AccountActivity',AccountActivitySchema);
const TotalsYearToDate = mongoose.model('TotalsYearToDate',TotalsYearToDateSchema);
const Statement = mongoose.model('Statement',StatementSchema);

module.exports = {AccountSummary,PaymentInformation,RewardSummary,AccountActivity,TotalsYearToDate,Statement};