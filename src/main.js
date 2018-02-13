//import 'webpack-hot-middleware/client';
import './index.html';
import sum from './sum';
import $ from 'jquery';
import 'bootstrap';
import './main.scss';

console.log('hallo world');

var a = () => {
	console.log('hallo from es6');
}

console.log(sum(1, 3));

$(() => {
	console.log('jquery is ready');
	$('#root').append('<h2>How are you doing?</h2>');
	$('#root').append('<button type="button" class="btn btn-primary">Primary</button>');
});