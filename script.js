$(function(){

	$.ionTabs("#maintabs");
	
	$('.select-product').zelect({
		placeholder: 'Choose product'
	});

	$("#grammage").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode == 67 && e.ctrlKey === true) ||
            (e.keyCode == 88 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $('.close-popup').click(function() {
    	$('.modal-container').fadeOut('400');
    });

    

	// calculation process

	$('.calculateMl').click(function() {
		var ml = parseInt($('#grammage').val());
		var units = $('.select-product').val().split(",");

		var unitsArray = calculateVolRezult(ml, units);
		if (unitsArray[3] > 100) {
			hideRezult();
			showPopup();
		}else{
			hideRezult();
			setRezult(unitsArray);
			showRezult();
		}
		
	});

	var calculateVolRezult = function (ml, units) {
		var volume = [];
		var volumeRezult;

		for (var i = units.length - 1; i >= 0; i--) {
			if (parseInt(units[i]) !== 0) {

				if(i === 0){
					volumeRezult = Math.round(ml / units[i]);
				}else{
					volumeRezult = Math.floor(ml / units[i]);
				}

				if (volumeRezult > 0) {
					ml = ml%units[i]
				};
			}else{
				volumeRezult = 0;
			};

			volume.unshift(volumeRezult);
		};
		return volume;
	}
	var hideRezult = function () {
		$('.rezult-list').removeClass('visible-list noPlus');
	}
	var setRezult = function (unitsArray) {
	
		for (var i = unitsArray.length - 1; i >= 0; i--) {
			if (unitsArray[i] !== 0) {
				$('.rezult-list').eq(3 - i).addClass('visible-list');
				$('.rezult-list').eq(3 - i).find('.vol-number').html(unitsArray[i]);
			};
		};

	}

	var showRezult = function () {
		$('.rezult-block').slideDown('400');
		$('.visible-list:visible:last').addClass('noPlus');
	}

	var showPopup = function () {
		$('.modal-container').fadeIn('400');
	} 

});


