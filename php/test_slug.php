<?php
function slugToTitle(string $slug): string {
    $text = str_replace('-', ' ', $slug);
    
    $words = explode(' ', $text);
    $words = array_map(function($word) {
        if ($word === '') return $word;
        if (mb_substr($word, 0, 1, 'UTF-8') === 'i') {
            return 'İ' . mb_substr($word, 1, null, 'UTF-8');
        }
        return mb_convert_case($word, MB_CASE_TITLE, 'UTF-8');
    }, $words);
    
    return implode(' ', $words);
}

$test1 = 'apac-a11-serisi-ege-motorlari';
$test2 = 'endustriyel';
$test3 = 'havali-montaj-aletleri';

echo "Input: $test1\n";
echo "Output: " . slugToTitle($test1) . "\n\n";

echo "Input: $test2\n";
echo "Output: " . slugToTitle($test2) . "\n\n";

echo "Input: $test3\n";
echo "Output: " . slugToTitle($test3) . "\n\n";

// Expected from database
echo "Expected from DB:\n";
echo "parent: Endüstriyel\n";
echo "child: Havalı Montaj Aletleri\n";
echo "subchild: Apac A11 Serisi Eğe Motorları\n";
