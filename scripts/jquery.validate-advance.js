(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery", "../jquery.validate"], factory);
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory(require("jquery"));
	} else {
		factory(jQuery);
	}
}(function ($) {

	/*
	 * Translated default messages for the jQuery validation plugin.
	 * Locale: RU (Russian; русский язык)
	 */
	$.extend($.validator.messages, {
		required: "Это поле необходимо заполнить.",
		remote: "Пожалуйста, введите правильное значение.",
		email: "Пожалуйста, введите корректный e-mail",
		url: "Пожалуйста, введите корректный URL.",
		date: "Пожалуйста, введите корректную дату.",
		dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
		number: "Пожалуйста, введите число.",
		digits: "Пожалуйста, вводите только цифры.",
		creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
		equalTo: "Пароли не совпадают!",
		extension: "Пожалуйста, выберите файл с правильным расширением.",
		maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
		minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
		rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
		range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
		max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
		min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
	});
	return $;
}));

/*!
 * jQuery Validation Plugin v1.17.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2017 Jörn Zaefferer
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery", "./jquery.validate"], factory);
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory(require("jquery"));
	} else {
		factory(jQuery);
	}
}

	(function ($) {

		(function () {

			function stripHtml(value) {

				// Remove html tags and space chars
				return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ")

					// Remove punctuation
					.replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
			}

			$.validator.addMethod("maxWords", function (value, element, params) {
				return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length <= params;
			}, $.validator.format("Please enter {0} words or less."));

			$.validator.addMethod("minWords", function (value, element, params) {
				return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
			}, $.validator.format("Please enter at least {0} words."));

			$.validator.addMethod("rangeWords", function (value, element, params) {
				var valueStripped = stripHtml(value),
					regex = /\b\w+\b/g;
				return this.optional(element) || valueStripped.match(regex).length >= params[0] && valueStripped.match(regex).length <= params[1];
			}, $.validator.format("Please enter between {0} and {1} words."));

		}());



		$.validator.addMethod("alphanumeric", function (value, element) {
			return this.optional(element) || /^\w+$/i.test(value);
		}, "Letters, numbers, and underscores only please");


		/**
		 * password pattern: не менее 8 символов, латинские буквы, цифры и символы ! # $ % ^ & * ( ).
		 */
		$.validator.addMethod("passw", function (value, element) {
			return this.optional(element) || /^[0-9A-Za-z!#$%^&*()]{8,}$/.test(value);
		}, "Разрешены латинские буквы,<br>цифры и символы ! # $ % ^ & * ( )");

		/**
		 * password pattern: Российский с.т. через +7 или 8.
		 */
		$.validator.addMethod("email", function (value, element) {
			return this.optional(element) || /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value);
		}, "Пожалуйста, введите корректный email");

		/**
		 * password pattern: Российский с.т. через +7 или 8.
		 */
		$.validator.addMethod("phoneRU", function (value, element) {
			return this.optional(element) || /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(value);
		}, "Пожалуйста, введите корректный телефон");

		/**
		 * login pattern: email или телефон.
		 */
		$.validator.addMethod("login", function (value, element) {
			return this.optional(element) || /^([-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4})|(\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2})$/.test(value);
		}, "Пожалуйста, введите корректный логин");

		return $;
	}));

(function () {

	$(".checkIn__2").validate({
		rules: {
			chekIn_email: {
				email: true,
				required: true
			},
			password: {
				passw: true,
				required: true
			},
			password_confirm: {
				equalTo: "#checkIn__2-password-field"
			}
		}
	});

	$(".checkIn__3").validate({
		rules: {
			chekIn_phone: {
				phoneRU: true,
				required: true
			}
		}
	});

	$(".checkIn__5").validate({
		rules: {
			password: {
				passw: true,
				required: true
			}
		}
	});

	$(".signIn__1").validate({
		rules: {
			signIn_login: {
				login: true,
				required: true
			},
			signIn_password: {
				passw: true,
				required: true
			}
		}
	});

	$(".signIn__2").validate({
		rules: {
			signIn_login: {
				login: true,
				required: true
			}
		}
	});
})();

$(document).ready(function () {

	$(".checkIn__2-password-field").on('input', function () {
		var pass = $(".checkIn__2-password-field").val();
		$(".checkIn__2-password-field ~ .popup__password-strong-message").text(check(pass));
	});

	$(".checkIn__5-password-field").on('input', function () {
		var pass = $(".checkIn__5-password-field").val();
		$(".checkIn__5-password-field ~ .popup__password-strong-message").text(check(pass));
	});



	function check(pass) {
		var protect = 0;
		if (pass.length < 8) {
			return "";
		}

		if (!pass.match(/^[0-9A-Za-z!#$%^&*()]{8,}$/)) {
			return "НЕВЕРНЫЙ ПАРОЛЬ";
		}

		if (pass.length > 11 && !pass.match(/^(.)\1{11,12}$/)) {
			protect++;
		}

		if (pass.length > 14 && !pass.match(/^(.)\1{13,}$/)) {
			protect++;
		}

		//a,s,d,f
		var small = pass.match("([a-z]+)");

		//A,B,C,D
		var big = pass.match("([A-Z]+)");

		//1,2,3,4,5 ... 0
		var numb = pass.match("([0-9]+)");

		//!@#$
		var vv = pass.match("([!#$%^&*()]+)");

		if (small) {
			protect++;
		}
		if (big) {
			protect++;
		}
		if (numb) {
			protect++;
		}
		if (vv) {
			protect++;
		}


		if (protect == 1) {
			return "СЛАБЫЙ ПАРОЛЬ";
		}

		if (protect == 3) {
			return "СРЕДНИЙ ПАРОЛЬ";
		}

		if (protect == 4) {
			return "ХОРОШИЙ ПАРОЛЬ";
		}

		if (protect == 5) {
			return "ОТЛИЧНЫЙ ПАРОЛЬ";
		}

	}
});