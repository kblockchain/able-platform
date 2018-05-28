pragma solidity ^0.4.23;

/**
 * Math operations with safety checks
 */
library SafeMath {
    function safeMul(uint a, uint b) internal returns (uint) {
        uint c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function safeDiv(uint a, uint b) internal returns (uint) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function safeSub(uint a, uint b) internal returns (uint) {
        assert(b <= a);
        return a - b;
    }

    function safeAdd(uint a, uint b) internal returns (uint) {
        uint c = a + b;
        assert(c >= a && c>=b);
        return c;
    }

    function safeMax64(uint64 a, uint64 b) internal constant returns (uint64) {
        return a >= b ? a : b;
    }

    function safeMin64(uint64 a, uint64 b) internal constant returns (uint64) {
        return a < b ? a : b;
    }

    function safeMax256(uint256 a, uint256 b) internal constant returns (uint256) {
        return a >= b ? a : b;
    }

    function safeMin256(uint256 a, uint256 b) internal constant returns (uint256) {
        return a < b ? a : b;
    }

}