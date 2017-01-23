'use strict';

/**
*Convert a string to a Date*
*@param [string] strict
*@return [Date]
*/
function convertDate(str){
	var re=/[0-9]+/g;
	var result = re[Symbol.match](str);
	var dateLoc = Date(result[0], result[1], result[2]);
	return dateLoc;
}

function getDays(beginDate, returnDate){
var begin = convertDate(beginDate).getTime();
var end = convertDate(returnDate).getTime();
return Math.floor((end-begin)/ 3600*1000*24)+1;
}


//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function RentalTime(rental)
{
	return getDays(rental.pickupDate,rental.returnDate);
}

function getCar(carId)
{
	for (var car in cars)
		{
			if (car.id==carId)
			{
				return car;
			}
		}
}

function GetPrice(rental)
{
	var time = RentalTime(rental);
	var car = getCar(rental.carId)
	rental.price= rental.distance*car.pricePerKm+time* car.pricePerDay;
}

function PriceRentals(){
	for (var i=0; i<rentals.length;i++) 
	{
		GetPrice(rentals[i])
	}
}

function getDiscount(rental)
{
	var time = RentalTime(rental);
		var car = getCar(rental.carId)
		
		if (time>1 && time <4)
			{
				rental.price-=(time-1)*pricePerDay*0.1;
			}
		else if (time>4 && time <10)
			{
				rental.price-=3*pricePerDay*0.1+(time-4)*car.pricePerDay*0.3;
			}
		else if (time>10)
			{
				rental.price-=3*pricePerDay*0.1+ 6*car.pricePerDay*0.3+(time-10)*car.pricePerDay*0.5;
			}
}

function discount()
{
	for (var i=0; i<rentals.length;i++) 
	{
		getDiscount(rentals[i])
	}		
}

function getCommission(rental)
{
	time=RentalTime(rental);
	var commission =0.3*rental.price;
	rental.commission.insurance=commission/2;
	rental.commission.assistance=time;
	rental.commission.drivy=commission/2-time;
}

function CommissionRentals(){
	for (var i=0; i<rentals.length;i++) 
	{
		getCommission(rentals[i])
	}
}

function getOption(rental)
{
	var time = RentalTime(rental);
		if (rental.options.deductibleReduction==true)
		{
			rental.price+=4*time;
		}
}

function optionsRentals()
{
	for (var i=0; i<rentals.length;i++) 
	{
		getOption(rentals[i])
	}
}


function getActor(rental)
{
	for (var j=0, i<actors.length;j++)
		{
			if(rental.rentalId==actors[j].rentalId)
			{
				return actors[j];
			}
		}
}

function PayActors()
{
	for (var i=0; i<rentals.length;i++) 
	{
		var actor = getActor(rental[i]);
		for (transaction in actor.payment)
		{
			if(transaction.who == "driver")
			{
				transaction.amount=rentals[i].price;
			}
			else if(transaction.who=="owner")
			{
				transaction.amount=rentals[i].price*0.7;
			}
			else if(transaction.who=="insurance")
			{
				transaction.amount=rentals[i].commission.insurance;
			}
			else if(transaction.who=="assistance")
			{
				transaction.amount=rentals[i].commission.assistance;
			}
			else if(transaction.who=="drivy")
			{
				if(rentals[i].options.deductibleReduction==true)
				{
					var time = RentalTime(rentals[i]);
					transaction.amount=rentals[i].commission.drivy+4*time;
				}
				else
				{
					transaction.amount=rentals[i].commission.drivy;
				}
			}
		}
		
	}
}

function Addpayment(actor,who,type,amount)
{
	var transaction;
	transaction.who=who
	transaction.type=type;
	transaction.amount=amount;
	actor.payment[actor.payment.lenght]=transaction;
}

function getRental(rentalId)
{
	for (var rental in rentals)
		{
			if (rental.id==rentalId)
			{
				return rental;
			}
		}
}

function PayActorsAfterChanges()
{
	for (var i=0; i<rentalModifications.length;i++) 
	{
		var rental = getRental(rentalModifications.rentalId)
		if (rentalModifications.pickupDate)
		{
			rental.pickupDate=rentalModifications.pickupDate;
		}
		if (rentalModifications.returnDate)
		{
			rental.returnDate=rentalModifications.returnDate;
		}
		if (rentalModifications.distance)
		{
			rental.distance=rentalModifications.distance
		}
		getPrice(rental);
		getDiscount(rental);
		getOption(rental);
		getCommission(rental);
	}
	
	var actor = getActor(rental);
	for (transaction in actor.payment)
	{
		if(transaction.who == "driver")
		{
			Addpayment(actor,"driver","debit",rental.price-transaction.amount);
		}
		else if(transaction.who=="owner")
		{
			Addpayment(actor,"owner","credit",rental.price*0.7-transaction.amount);
		}
		else if(transaction.who=="insurance")
		{
			Addpayment(actor,"insurance","credit",rental.commission.insurance-transaction.amount);
		}
		else if(transaction.who=="assistance")
		{
			Addpayment(actor,"assistance","credit",rental.commission.assistance-transaction.amount);
		}
		else if(transaction.who=="drivy")
		{
			if(rentals[i].options.deductibleReduction==true)
				{
					var time = RentalTime(rentals[i]);
					Addpayment(actor,"drivy","credit",rental.commission.drivy+4*time-transaction.amount);
				}
			else
				{
					Addpayment(actor,"drivy","credit",rental.commission.drivy-transaction.amount);
				}
			
		}
	}
}

PriceRentals();//ex1
discount();//ex2
CommissionRentals();//ex3
optionsRentals();//ex4
PayActors();//ex5
PayActorsAfterChanges();//ex6

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
