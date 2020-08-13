<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Document Cloud - Video Player</title>
		<style type="text/css">

			body {
				background-color: #000;
			}

			.video_player {
				position: relative;
				width: 90%;
				margin: 20px auto;
			}

			.video_player::before {
				content: '';
				display: block;
				padding-top: 56.25%;
			}
			
			.video_player iframe {
				border: none;
				padding: 0;
				position: absolute;
				top: 0px;
				left: 0px;
				width: 100%;
				height: 100%;
				margin: 0;
			}

		</style>
	</head>
	<body>
		
		<?php
			
			// Don't modify these
			$video_player_url = 'https://extranet.codifydesign.com/adobe-sign-resource-hub/video.php';
			$iframe_url = $video_player_url . '?file=' . $video_file_name . '&lang=' . $video_file_lang;

		?>

		<div class="video_player">
			<iframe frameborder="0" src="<?php echo $iframe_url; ?>" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen"></iframe>
		</div>

	</body>
</html>