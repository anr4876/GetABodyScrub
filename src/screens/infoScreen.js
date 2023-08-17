import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    faPhone,
    faCreditCard,
    faArrowUpFromBracket,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// 구분선 컴포넌트
const Divider = () => <View style={styles.divider} />;

// 탭 데이터
const TAB_ITEMS = [
    { title: '메뉴', content: '분야1 리뷰 내용' },
    {
        title: '정보',
        content: `
                기본 정보
                --------------
                휴무일: 연중무휴

                영업시간: 24시간 영업

                주소: 대전광역시 유성구 봉명동 538-1번지

                지하철: 유성온천 7번 출구

                지하 주차장: 지하주차장 무료 주차 가능

                수면 안내: 수면 가능
                `,
    },
    { title: '리뷰', content: '분야3 리뷰 내용' },
];


const InfoScreen = () => {
    // 선택된 탭 인덱스 상태
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // 공유 버튼 클릭 이벤트 처리 함수
    const onShareButtonPress = () => {
        console.log('공유 버튼 클릭됨');
        // 공유 기능 구현
    };

    // 탭 아이템 렌더링 함수
    const renderTabItem = (tab, i) => {
        const isSelected = i === selectedTabIndex;
        const selectedTabItemText = isSelected ? styles.selectedTabItemText : null;

        return (
            <TouchableOpacity
                key={i}
                style={styles.tabItem}
                onPress={() => setSelectedTabIndex(i)}
            >
                {isSelected && (
                    <>
                        <View style={styles.selectedTabItemTopBorder} />
                        <View style={styles.selectedTabItemTopBorder2} />
                    </>
                )}
                <Text style={selectedTabItemText}>{tab.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>유성온천 불가마 사우나</Text>
                <TouchableOpacity onPress={onShareButtonPress}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </TouchableOpacity>
            </View>

            {/* 탭 바 */}
            <View style={styles.tabBar}>{TAB_ITEMS.map(renderTabItem)}</View>

            {/* 탭 컨텐츠 */}
            <View style={styles.scene}>
                <Text style={styles.contentText}>{TAB_ITEMS[selectedTabIndex].content}</Text>
            </View>

            {/* 업체 소개 */}
            <View style={styles.소개}>
                <Divider />
                <Text>업체소개</Text>
            </View>

            {/* 하단 버튼 바 */}
            <View style={styles.lowbar}>
                {/* 바로 결제 버튼 */}
                <TouchableOpacity style={[styles.button, styles.leftButton]}>
                    <FontAwesomeIcon icon={faCreditCard} />
                    <Text style={styles.white}>바로 결제</Text>
                </TouchableOpacity>

                {/* 전화 예약 버튼 */}
                <TouchableOpacity style={[styles.button, styles.rightButton]}>
                    <FontAwesomeIcon icon={faPhone} />
                    <Text style={styles.white}>전화 예약</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        alignItems: 'flex-start',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 16,
        alignSelf: 'stretch',
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    selectedTabItemTopBorder: {
        backgroundColor: 'red',
        position: 'absolute',
        top: -1,
        left: 0,
        right: 0,
        height: 2,
    },
    selectedTabItemTopBorder2: {
        backgroundColor: 'lightgray',
        position: 'absolute',
        top: 1,
        left: 0,
        right: 0,
        height: 5,
    },
    selectedTabItemText: {
        color: 'red',
    },
    scene: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 10,
        backgroundColor: 'lightgray',
        alignSelf: 'stretch',
    },
    소개: {
        flex: 5,
        backgroundColor: 'red',
        alignSelf: 'stretch',
    },
    lowbar: {
        flex: 2,
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#CA6C6C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftButton: {
        marginRight: 0.5,
    },
    rightButton: {
        marginLeft: 0.5,
    },
    white: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    divider: {
        padding: 2,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
    },
});

export default InfoScreen;
