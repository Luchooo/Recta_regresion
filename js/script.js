jQuery(document).ready(function($) 
{

	var x = []; //Guardar en un array X
	var y = [];	//Guardar en un array Y
	var x_media = 0; //Guardar la media del array X
	var y_media = 0;  //Guardar la media del array Y
	var x_elevado_2 = 0; //Necesario para calcular varianza
	var varianza = 0; //Calcular varianza
	var covarianza = 0; //Calcular covarianza
	var m = 0; // Y=mx+b
	var h = 0; //Auxiliar para despejar ecuaciòn
	var numero = 0; //Nùmero de puntos a graficar
	var d2 = []; // Linea de regreciòn --> Grafica
	var d0 = []; // Linea en x = 0 --> Grafica
	var d1 = []; // Puntos  --> Grafica
	var ecuacion; //Guardar mensaje final
	var espacio_de_maso_menos=10;
	var incompletos = true; 

	swal(
			{   
				title				: "!Puntos!",   
				text 				: "Escriba la cantidad de puntos que desea usar:",   
				type 				: "input",
				showCancelButton 	: true,
				confirmButtonColor 	: "#e67e22",
				closeOnConfirm 		: false,   
				animation 			: "slide-from-top",   
				inputPlaceholder 	: "Escriba aqui" 
			}, function(inputValue)
				{   
					if (inputValue === false) 
						return false;      
					
					if (inputValue === "") 
						{     
							swal.showInputError("!Digite los campos!");     
							return false   
						} 
					
					if (inputValue <= 1) 
						{     
							swal.showInputError("!Por lo menos deben ser 2 puntos!");     
							return false   
						}

					if (isNaN(inputValue)) 
						{     
							swal.showInputError("!Digite solo numeros!");     
							return false   
						}

					var patron = /^\d*$/;                          //Expresión regular para aceptar solo números enteros positivos
					if (!patron.test(inputValue)) 
						{             
							swal.showInputError("!El número es incorrecto!");     
							return false   
						}
					

				swal
				(
					{   
						title  				: "!Gracias!",   
						text 				: "La cantidad de puntos sera: " + inputValue,   
						type 				: "success",
						cancelButtonColor 	: "#3498db",    
						showCancelButton 	: false,
						showConfirmButton 	: false,
						animation 			: "slide-from-top",
						timer				: 2000   
					}
				)

				
					//swal("Gracias!", "La cantidad de puntos es: " + inputValue, "success"); 
				digitarPuntos(inputValue);
				}
		);


	function digitarPuntos (numero) 
	{

		
			var tabla ="<table   id = 'Tabla1' width = '50%' border = '0' align = 'center' cellpadding = '0' cellspacing = '0'>";
			tabla += "<tr><th><center>X</center></th><th><center>Y</center></th></tr>";
			for (var i = 0; i < numero; i++) 
				{			
					tabla += "<tr>";
					for (var j = 0; j < 2; j++) 
						{
							tabla += "<td><center><input  id = '"+(i)+"_"+(j)+"' type='number' required></center></td>";
						};
					tabla+="</tr>"
				};
			
			tabla+="</table>";
			//console.log(tabla);
			$(container).append(tabla);

			$('#calcula').click(function(event) 
			{
			validarCampos(numero,incompletos);
			});
		
		
	}


	function recolectarNumeros (numero,incompletos) 
	{

			if(!incompletos)
			{	
		
			$('#calcula').hide();
			for (var i = 0; i < numero; i++) 
			{			
				for (var j = 0; j < 2; j++) 
				{
					if (j % 2 == 0 ) 
					{
						x.push(Number($('#'+i+'_'+j).val()));	
					}
					else
					{
						y.push(Number($('#'+i+'_'+j).val()));
					}
				};
			};

			//console.log("Arreglo x "+x);
			//console.log("Arreglo y "+y);


			//Hallar X_Media
			for ( a = 0; a < x.length; a++ ) 
			{
	      		x_media += Number(x[a]);
			};

			//Hallar Y_Media
			for ( s = 0; s < y.length; s++ ) 
			{
	      		y_media += Number(y[s]);
			};	

			x_media = x_media/numero;
			y_media = y_media/numero;

			//console.log("X Media " + x_media);
			//console.log("Y Media " + y_media);


			//Hallar varianza
			for ( a = 0; a < x.length; a++ ) 
			{
	      		x_elevado_2 += Math.pow(Number(x[a]),2);
			};			

			varianza = (x_elevado_2/numero)-Math.pow(x_media,2);
			//console.log("Varianza: " + varianza);

			//Hallar Covarianza

			for(i = 0; i < x.length; i++)
			{
 			 covarianza += Number(x[i])*Number(y[i]);
			}

			covarianza = Number((covarianza/numero)-(x_media*y_media));
			//console.log("Covarianza: " + covarianza);


			//Ecuación de la recta de regresión --> y= mx+b

			m = covarianza/varianza;
			h = -(y_media);
			x_media = -(x_media);
			b = (m*x_media)
			
			//Planteando la ecuacion
			//Saber si h es positivo o negativo

			if (h < 0) 
				{
					//Es negativo al pasarlo cambia de signo por eso se suma.
					h = Math.abs(h);
					b = (m*x_media) + h;
				}
			else 
				{ //Es positivo al pasarlo cambia de signo por eso se resta.
					h = Math.abs(h);
					b = (m*x_media) - h 
				};

			if (b < 0) 
				{
					ecuacion ="La ecuación es: y = " + m.toFixed(4) +"x " + b.toFixed(4);
					//swal(ecuacion);
				}
			
			else
				{

					ecuacion ="La ecuación es: y = " + m.toFixed(4) +"x + " + b.toFixed(4);
					//swal(ecuacion);
				};

 			$(function () 
 			{
 				(function mouse_zoom(container) 
 				{
 					//Calcular puntos
		            for (var i = 0; i < numero; i++) 
		            {
		              d1.push([Number(x[i]), Number(y[i])]);
		             };
            		//Fin calcular puntos_______________

            
            		// Calcular linea de regresion
		           // Ordenar Arreglo x
		        	for(var i = 1;i < x.length;i++)
		        	{
		          		for(var j = 0;j < (x.length-i);j++)
		          		{
		            		if(x[j] > x[j+1])
		            		{
				            	k = x[j+1];
				            	x[j+1] = x[j];
				            	x[j] = k;
		            		}
		          		}
		       		}
             
			        //Ordenar Arreglo Y
			        for(var i = 1;i < y.length;i++)
			        {
			        	for(var j = 0;j < (y.length-i);j++)
			          	{
			            	if(y[j] > y[j+1])
			            	{
			              		k = y[j+1];
			              		y[j+1] = y[j];
			              		y[j] = k;
			            	}
			          	}
			        }


          			//  console.log(x);
					//for (var n = x[0]; n <= x[x.length-1]; n++) //Cifras no decimales

          			//Crear Recta
					for (var n = x[0]; n <= x[x.length-1]; n+=0.01)
					{
						d2.push([Number(n), Number((m*n) + b)])
					};
					//Fin crear recta___________ 

					
					//Crear linea que pasa por cero
					for (var i = -1000; i < 1000; i++) 
					{
						d0.push([i, 0]);
					};
					  
           
          			
					//Graficar --> Libreria Flotr2 --> http://www.humblesoftware.com/flotr2/
          			// console.log(d2);

	 				var options;
				   	var graph;
				    options = 
				    {
				  	selection  	: { 
				  				  	mode	: 'x', 
				  				  	fps		: 30 
				  				  },
				  	colors 		: ['#00A8F0', '#f1c40f', 'yellow', 'green', '#2c3e50'],
				    legend 		: { 
				    			  	position : 'se', 
				    			  	backgroundColor : '#c0392b' 
				    			  },
	                title 		: 'Recta de regresion ',
	                subtitle	: ' ',
	                grid		: {
	                			  	color 		:"#1b1e24",
	                				tickColor 	:'#ecf0f1'
	                			  },
	                selection  	: { 
                			  	  mode : 'x', 
                			  	  fps  : 30 
	                			  },

	                xaxis   	: { 
                			 	  color 	:"#1b1e24",
                			 	  title 	:'Eje X', 
                			 	  min		:x[0]-espacio_de_maso_menos, 
                			 	  max 	: x[x.length-1]+espacio_de_maso_menos 
	                			  }, 
	                yaxis 		: { 
                			 	  color 	:"#1b1e24",
                			 	  title 	: 'Eje Y', 
                			 	  min 	:y[0]-espacio_de_maso_menos, 
                			 	  max 	: y[y.length-1]+espacio_de_maso_menos 
	                			  },
	                mouse 		: {
			                      track           : true, // Enable mouse tracking
			                      lineColor       : 'purple',
			                      relative        : true,
			                      position        : 'ne',
			                      sensibility     : 2,
			                      trackDecimals   : 2,
			                      trackFormatter  : function (o) { return 'x = ' + o.x +', y = ' + o.y; }
			                    },
	                crosshair 	: {
	                      		  mode : 'xy'
	                    		  }
            
				  };
				    
				  // Draw graph with default options, overwriting with passed options
				  function drawGraph (opts) {

				    // Clone the options, so the 'options' variable always keeps intact.
				    var o = Flotr._.extend(Flotr._.clone(options), opts || {});

				    // Return a new graph.
				    return Flotr.draw
			            (
				            container, 
				            [ 
				                { data : d0, shadowSize : 0, color : '#545454', mouse : { track : false } }, // Horizontal en X 
				                { data : d1, points : { show : true } }, //Puntos
				                { data : d2, }  // Regression
				            ],o
			            
			          	);
				  }

				  // Actually draw the graph.
				  graph = drawGraph();      
				    
				  // Hook into the 'flotr:select' event.
				  Flotr.EventAdapter.observe(container, 'flotr:select', function (area) 
				  {
				    // Draw graph with new area
				    graph = drawGraph
				    (
				    	{
				        	xaxis: {title: 'Eje X', min:area.x1, max:area.x2},
				        	yaxis: {title: 'Eje Y',min:area.y1, max:area.y2}
				    	}
				    );
				  });
				    
				  // When graph is clicked, draw the graph with default area.
				  Flotr.EventAdapter.observe(container, 'flotr:click', function () { drawGraph(); });
				})(document.getElementById("editor-render-0"));

			});
			

			for (var i = 0; i < numero; i++) 
				{			
					for (var j = 0; j < 2; j++) 
					{
						$('#'+i+'_'+j).prop('disabled', true);
							
							
					};
				};

			$('#ecuacion').show();


			};
		};

	$('#youtube').click(function(event) 
	{
		window.open("https://www.youtube.com/watch?v=xCz0xaVsaRw");
		window.open("https://www.youtube.com/watch?v=SxC_L1XtUJk");
	});


	$('#nuevo').click(function(event) 
	{
		window.location.reload();
	});

	$('#ecuacion').click(function(event) 
	{
		swal(ecuacion);
	});


	

	function validarCampos (numero,incompletos) 
	{
		if (incompletos) 
			{
				for (var i = 0; i < numero; i++) 
				{			
					for (var j = 0; j < 2; j++) 
					{
						if ($('#'+i+'_'+j).val() === "") 
							{
							 swal({   
									title 				: "!Error!",
									type 				: "warning",  
									text 				: "Complete todos los campos",   
									timer 				: 2000,   
									showConfirmButton 	: false 
								 });

							 $('#'+i+'_'+j).focus();
							 incompletos=true;
							 break;
							};
							incompletos=false;
					};
					
					

				};
			};
			recolectarNumeros(numero,incompletos)
	}

		
});
